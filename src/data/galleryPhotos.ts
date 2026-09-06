export type GalleryTreatment = "photo" | "title" | "pattern";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  treatment: GalleryTreatment;
};

const alt = "Austin and Alexa";

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/photos/engagement/krs-3492.jpg", alt, caption: "In the orchard", treatment: "photo" },
  { src: "/photos/engagement/krs-3535.jpg", alt, caption: "Among the apples", treatment: "photo" },
  { src: "/photos/engagement/krs-3550.jpg", alt, caption: "A look", treatment: "photo" },
  { src: "/photos/engagement/krs-3555.jpg", alt, caption: "Together", treatment: "photo" },
  { src: "/photos/engagement/krs-3572.jpg", alt, caption: "On the branch", treatment: "photo" },
  { src: "/photos/engagement/krs-3578.jpg", alt, caption: "Golden hour", treatment: "photo" },
  { src: "/photos/engagement/krs-3648.jpg", alt, caption: "Close", treatment: "photo" },
  { src: "/photos/engagement/krs-3657.jpg", alt, caption: "The ring", treatment: "photo" },
  { src: "/photos/engagement/krs-3661.jpg", alt, caption: "Yes", treatment: "photo" },
  { src: "/photos/engagement/krs-3662.jpg", alt, caption: "That hand", treatment: "photo" },
  { src: "/photos/engagement/krs-3664.jpg", alt, caption: "Playful", treatment: "photo" },
  { src: "/photos/engagement/krs-3673.jpg", alt, caption: "Under the trees", treatment: "photo" },
  { src: "/photos/engagement/krs-3706.jpg", alt, caption: "A walk", treatment: "photo" },
  { src: "/photos/engagement/krs-3727.jpg", alt, caption: "Side by side", treatment: "photo" },
  { src: "/photos/engagement/krs-3729.jpg", alt, caption: "Quiet", treatment: "photo" },
  { src: "/photos/engagement/krs-3751.jpg", alt, caption: "Sunlit", treatment: "photo" },
  { src: "/photos/engagement/krs-3777.jpg", alt, caption: "A laugh", treatment: "photo" },
  { src: "/photos/engagement/krs-3778.jpg", alt, caption: "Another laugh", treatment: "photo" },
  { src: "/photos/engagement/krs-3806.jpg", alt, caption: "Caught mid-spin", treatment: "photo" },
  { src: "/photos/engagement/krs-3816.jpg", alt, caption: "The path", treatment: "photo" },
  { src: "/photos/engagement/krs-3849.jpg", alt, caption: "Fields", treatment: "photo" },
  { src: "/photos/engagement/krs-3852.jpg", alt, caption: "Still dancing", treatment: "photo" },
  { src: "/photos/engagement/krs-3866.jpg", alt, caption: "Toward the light", treatment: "photo" },
  { src: "/photos/engagement/krs-3867.jpg", alt, caption: "One more step", treatment: "photo" },
  { src: "/photos/engagement/krs-3879.jpg", alt, caption: "Salute", treatment: "photo" },
  { src: "/photos/engagement/krs-3880.jpg", alt, caption: "The dive", treatment: "photo" },
  { src: "/photos/engagement/krs-3881.jpg", alt, caption: "That's us", treatment: "photo" },
];
