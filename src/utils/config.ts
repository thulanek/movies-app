export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
}

export interface Genre {
  id: number;
  name: string;
}

export const apiBaseURL = "https://api.themoviedb.org/3";

interface IFormInputs {
  label: string;
  type: string;
  name: string;
  validationOptions:
    | Partial<{
        required: string | boolean;
        min: string | number;
        max: string | number;
        pattern: RegExp | { value: RegExp; message: string };
        validate: () => boolean | string;
      }>
    | undefined;
}

// {value: T, message: string}

export const formInputs: IFormInputs[] = [
  {
    label: "first name",
    type: "text",
    name: "firstName",
    validationOptions: {
      required: "name required",
    },
  },
  {
    label: "surname",
    type: "text",
    name: "surname",
    validationOptions: {
      required: "surname required",
    },
  },
  {
    label: "email address",
    type: "email",
    name: "email",
    validationOptions: {
      required: "email required",
      pattern: {
        value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        message: "enter valid email address",
      },
    },
  },
  {
    label: "phone number",
    type: "tel",
    name: "phoneNumber",
    validationOptions: {
      required: "phone required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "enter valid 10 digit phone number",
      },
    },
  },
];

export interface ITrelloFormData {
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export const pages = {
  home: "/",
  popular: "/popular",
  about: "/about",
  favourites: "/favourites",
};
