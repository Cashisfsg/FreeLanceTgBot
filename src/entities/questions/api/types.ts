export interface Question {
    sections: Section[];
}

export interface Section {
    name: "bot_category" | "functionality" | "work_conditions";
    questions: Question[];
}

export type QuestionType =
    | "checkbox"
    | "radio"
    | "vertical_slider"
    | "drag_and_drop"
    // | "select"
    | "text";
// | "combobox";

type TextInputType =
    | "text"
    | "date"
    | "number"
    // | "email"
    // | "password"
    // | "tel"
    | "textarea";

interface TextInput {
    type: TextInputType;
    description: string;
    placeholder: string;
}

interface FileInput {
    types: string;
    button_text: string;
}

interface Link {
    url: string;
    text: string;
}
export interface Question {
    question_id: number;
    question_key: string;
    question_type: QuestionType;
    question_text: string;
    question_description?: string;
    is_required: boolean;
    display_order: number;
    text_input: TextInput | null;
    file_input: FileInput | null;
    link: Link | null;
    options: Option[] | null;
}

export interface Option {
    option_id: number;
    option_key: string;
    option_text: string;
    subtitle: string | null;
    icon_url: string | null;
    hint: string | null;
    display_order: number;
}

export interface FetchAllQuestionsResponse {
    sections: Section[];
}

export type FetchAllQuestionsTransformedResponse = Section[];
