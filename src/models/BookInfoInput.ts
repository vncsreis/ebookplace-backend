export interface BookCreateInfo {
  title: string;
  author: string;
  year: string;
  image: string;
  epub: string;
  genreId: string;
  synopsis: string;
  userId: string;
}

export interface BookUpdateInfo {
  title?: string;
  author?: string;
  year?: string;
  image?: string;
  epub?: string;
  genreId?: string;
  synopsis?: string;
}
