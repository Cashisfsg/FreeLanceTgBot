export interface Questions {
    sections: Section[];
}

export interface Section {
    name: "bot_category" | "functionality" | "work_conditions";
    questions: Question[];
}

export interface Question {
    id: number;
    key: string;
    type: "radio" | "checkbox" | "text";
    text: string;
    description?: string;
    required: boolean;
    has_text_input: boolean;
    text_input_type?: string;
    text_input_description?: string;
    text_input_placeholder?: string;
    has_file_input: boolean;
    file_input_types?: string;
    file_input_button_text?: string;
    link_url?: string;
    link_text?: string;
    options: Option[];
    display_order: number;
    parent_question_id?: number;
    condition_option_id?: number;
}

export interface Option {
    id: number;
    key: string;
    text: string;
    subtitle?: string;
    icon_url?: string;
    hint?: string;
    display_order: number;
}

export type QuestionsResponse = Questions;

export type QuestionsResponseModified = Section[];
