"use client";

import React, { useState } from "react";
import { HoverCardSection, HoverCardItem } from "@/lib/db";
import MediaUpload from "../MediaUpload";
import { useRouter } from "next/navigation";

interface EditableHoverCardProps {
  section: HoverCardSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HoverCardSection>) => void;
}

interface HoverCard extends HoverCardItem {
  type?: "static" | "hover";
  titleFontSize?: string;
  titleFontWeight?: string;
  titleColor?: string;
  subtitleFontSize?: string;
  subtitleFontWeight?: string;
  subtitleColor?: string;
  link?: string;
}

const HoverCardComponent = ({ card }: { card: HoverCard }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    if (card.link) {
      router.push(card.link);
    }
  };

  if (card.type === "static") {
    return (
      <div 
        className={`w-full ${card.link ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        <div className="w-full rounded-lg overflow-hidden shadow-xl flex items-center justify-center bg-gray-100 min-h-64">
          {/* Background Media */}
          {card.mediaType === "video" && card.mediaUrl ? (
            <video
              src={card.mediaUrl}
              className="w-full h-auto max-w-full max-h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : card.mediaUrl ? (
            <img
              src={card.mediaUrl}
              alt={card.title}
              className="w-full h-auto max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No media</span>
            </div>
          )}
        </div>
        {/* Static Text Below Image */}
        <div className="flex flex-col items-center p-6 text-center">
          <h3 
            className="text-xl md:text-2xl mb-2"
            style={{
              color: card.titleColor || '#ef4130',
              fontSize: card.titleFontSize || undefined,
              fontWeight: card.titleFontWeight || 'bold'
            }}
          >
            {card.title}
          </h3>
          <p 
            className="text-base md:text-lg leading-relaxed"
            style={{
              color: card.subtitleColor || '#374151',
              fontSize: card.subtitleFontSize || undefined,
              fontWeight: card.subtitleFontWeight || '400'
            }}
          >
            {(card.subtitle || '').split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < (card.subtitle || '').split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }

  // Hover type
  return (
    <div
      className={`relative w-full rounded-lg overflow-hidden shadow-xl group flex items-center justify-center bg-gray-100 min-h-64 ${card.link ? 'cursor-pointer' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Background Media */}
      {card.mediaType === "video" && card.mediaUrl ? (
        <video
          src={card.mediaUrl}
          className="w-full h-auto max-w-full max-h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : card.mediaUrl ? (
        <img
          src={card.mediaUrl}
          alt={card.title}
          className="w-full h-auto max-w-full max-h-full object-contain"
        />
      ) : (
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500">No media</span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div
        className={`absolute inset-0 bg-red-600 transition-opacity duration-300 ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 text-center transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <h3 
          className="text-2xl md:text-3xl drop-shadow-lg"
          style={{
            color: card.titleColor || '#ffffff',
            fontSize: card.titleFontSize || undefined,
            fontWeight: card.titleFontWeight || 'bold'
          }}
        >
          {card.title}
        </h3>
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p 
          className="text-lg md:text-xl text-center leading-relaxed"
          style={{
            color: card.subtitleColor || '#ffffff',
            fontSize: card.subtitleFontSize || undefined,
            fontWeight: card.subtitleFontWeight || '400'
          }}
        >
          {(card.subtitle || '').split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index < (card.subtitle || '').split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default function EditableHoverCardSection({
  section,
  isEditing,
  onUpdate,
}: EditableHoverCardProps) {
  const content = section.content || {};
  const cards: HoverCard[] = Array.isArray(content.cards)
    ? (content.cards as HoverCard[])
    : [];

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleCardUpdate = (index: number, patch: Partial<HoverCard>) => {
    const updatedCards = cards.map((card, idx) =>
      idx === index ? { ...card, ...patch } : card
    );
    handleContentUpdate({ cards: updatedCards });
  };

  const handleAddCard = () => {
    const newCard: HoverCard = {
      id: Date.now().toString(),
      title: "New Card",
      subtitle: "Update this content",
      mediaType: "image",
      mediaUrl: "",
      type: "hover",
    };
    handleContentUpdate({ cards: [...cards, newCard] });
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = cards.filter((_, idx) => idx !== index);
    handleContentUpdate({ cards: updatedCards });
  };

  if (!isEditing) {
    const allCardsStatic = cards.every((card) => card.type === "static");

    return (
      <section className="pb-2 px-4 max-w-7xl mx-auto flex items-center justify-center">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            allCardsStatic ? "lg:grid-cols-2" : "lg:grid-cols-3"
          } gap-2`}
        >
          {cards.map((card) => (
            <HoverCardComponent key={card.id} card={card} />
          ))}
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const allCardsStatic = cards.every((card) => card.type === "static");
    const previewCards =
      cards.length > 0
        ? cards.slice(0, 3)
        : [
            {
              id: "1",
              title: "Sample Card",
              subtitle: "This is a sample hover card\nwith multiple lines",
              mediaType: "image",
              mediaUrl: "",
              type: "hover" as const,
            },
          ];

    return (
      <section className="pb-2 px-4 max-w-7xl mx-auto flex items-center justify-center rounded-lg">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            allCardsStatic ? "lg:grid-cols-2" : "lg:grid-cols-3"
          } gap-2`}
        >
          {previewCards.map((card) => (
            <HoverCardComponent key={card.id} card={card} />
          ))}
        </div>
      </section>
    );
  };

  const handleSaveChanges = () => {
    onUpdate({ content: { ...content, cards } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Live Preview */}
      <div className="rounded-xl border  bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <span className="h-3 w-3 rounded-full bg-fuchsia-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border  bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit Hover Card Section
          </h3>
          <button
            type="button"
            onClick={handleAddCard}
            className="rounded-lg border border-fuchsia-400 px-4 py-2 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-50"
          >
            Add Card
          </button>
        </div>
        <div className="space-y-6">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="space-y-4 rounded-lg border bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900">
                  Card {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => handleRemoveCard(index)}
                  className="text-sm text-red-600 transition hover:text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Type
                  <select
                    value={card.type || "hover"}
                    onChange={(event) =>
                      handleCardUpdate(index, {
                        type: event.target.value as "static" | "hover",
                      })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                  >
                    <option value="hover">Hover</option>
                    <option value="static">Static</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Media Type
                  <select
                    value={card.mediaType || "image"}
                    onChange={(event) =>
                      handleCardUpdate(index, { mediaType: event.target.value })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </label>
              </div>
              <MediaUpload
                label={`Card ${index + 1} Media`}
                type={card.mediaType === "video" ? "video" : "image"}
                currentUrl={card.mediaUrl}
                onUpload={(url) => handleCardUpdate(index, { mediaUrl: url })}
                onRemove={() => handleCardUpdate(index, { mediaUrl: "" })}
                placeholder="Upload media or paste URL..."
                maxSize={card.mediaType === "video" ? "50MB" : "10MB"}
                supportedFormats={
                  card.mediaType === "video"
                    ? "MP4, WebM, MOV"
                    : "PNG, JPG, WebP, GIF"
                }
                className=""
              />
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Title
                <input
                  type="text"
                  value={card.title || ""}
                  onChange={(event) =>
                    handleCardUpdate(index, { title: event.target.value })
                  }
                  className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Link (Optional)
                <input
                  type="text"
                  value={card.link || ""}
                  onChange={(event) =>
                    handleCardUpdate(index, { link: event.target.value })
                  }
                  className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                  placeholder="/about or https://example.com"
                />
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Title Font Size
                  <input
                    type="text"
                    value={card.titleFontSize || ""}
                    onChange={(event) =>
                      handleCardUpdate(index, {
                        titleFontSize: event.target.value,
                      })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                    placeholder="e.g. 24px"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Title Font Weight
                  <select
                    value={card.titleFontWeight || "bold"}
                    onChange={(event) =>
                      handleCardUpdate(index, {
                        titleFontWeight: event.target.value,
                      })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Title Color
                  <input
                    type="text"
                    value={card.titleColor || ""}
                    onChange={(event) =>
                      handleCardUpdate(index, {
                        titleColor: event.target.value,
                      })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                    placeholder="#ffffff"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Subtitle
                <textarea
                  value={card.subtitle || ""}
                  onChange={(event) =>
                    handleCardUpdate(index, { subtitle: event.target.value })
                  }
                  rows={3}
                  className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                />
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Subtitle Font Size
                  <input
                    type="text"
                    value={card.subtitleFontSize || ""}
                    onChange={(event) =>
                      handleCardUpdate(index, {
                        subtitleFontSize: event.target.value,
                      })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                    placeholder="e.g. 18px"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Subtitle Font Weight
                  <select
                    value={card.subtitleFontWeight || "400"}
                    onChange={(event) =>
                      handleCardUpdate(index, {
                        subtitleFontWeight: event.target.value,
                      })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi Bold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-sm text-gray-700">
                  Subtitle Color
                  <input
                    type="text"
                    value={card.subtitleColor || ""}
                    onChange={(event) =>
                      handleCardUpdate(index, {
                        subtitleColor: event.target.value,
                      })
                    }
                    className="rounded-lg border  bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                    placeholder="#ffffff"
                  />
                </label>
              </div>
            </div>
          ))}

          {/* Save Button */}
          <div className="mt-6 border-t pt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-lg bg-fuchsia-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
