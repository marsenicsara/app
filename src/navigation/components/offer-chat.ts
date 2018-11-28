import { OfferChatOverlay } from "src/features/new-offer/components/offer-chat-overlay";


export const OFFER_CHAT_COMPONENT = {
  name: 'OfferChat',
}

export const register = (
  registerComponent: (
    offerChatComponentName: string,
    getOfferChat: () => typeof OfferChatOverlay,
  ) => void
) => registerComponent(OFFER_CHAT_COMPONENT.name, () => OfferChatOverlay)
