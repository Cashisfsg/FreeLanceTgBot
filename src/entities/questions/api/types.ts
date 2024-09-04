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
    // | "vertical_slider"
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

export interface Question {
    question_id: number;
    question_key: string;
    question_type: QuestionType;
    question_text: string;
    question_description?: string;
    required: boolean;
    has_text_input: boolean;
    text_input_type?: TextInputType;
    text_input_description?: string;
    text_input_placeholder: string;
    has_file_input: boolean;
    file_input_types: string;
    file_input_button_text: string;
    link_url?: string;
    link_text?: string;
    options: Option[];
    display_order: number;
}

export interface Option {
    option_id: number;
    option_key: string;
    option_text: string;
    subtitle: string | null;
    icon_url: string | null;
    hint: string;
    display_order: number;
}

export interface FetchAllQuestionsResponse {
    sections: Section[];
}

export type FetchAllQuestionsTransformedResponse = Section[];
