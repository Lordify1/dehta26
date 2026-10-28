export type OfferOrigin = "direct" | "indirect";

export function offerOrigin(item: any): OfferOrigin {
  if (!item) return "indirect";
  const raw = String(
    item.origin || item.source || item.link_type || item.channel || item.listing_type || ""
  ).toLowerCase();
  if (["direct", "partner", "internal", "official", "verified"].some((k) => raw.includes(k))) {
    return "direct";
  }
  if (["indirect", "external", "outside", "third"].some((k) => raw.includes(k))) {
    return "indirect";
  }
  if (item.is_direct === true || item.is_partner === true || item.partner === true) return "direct";
  if (item.is_indirect === true || item.external === true) return "indirect";
  const link = item.external_url || item.external_link || item.apply_url || item.url;
  if (typeof link === "string" && link.startsWith("http")) return "indirect";
  return "direct";
}

export function offerLink(item: any): string {
  const link = item?.external_url || item?.external_link || item?.apply_url || item?.url || "";
  return typeof link === "string" ? link : "";
}
