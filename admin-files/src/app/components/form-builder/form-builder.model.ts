export interface FormFields {
        name: string;
        placeholder: string;
        label: string;
        type: "text" | "select" | "number" | "image";
        defaultValue: any;
        required: boolean;
        hidden?: boolean;
        options?: FormFieldsOption[];
}

export interface FormFieldsOption {
        id: number;
        title: string;
}