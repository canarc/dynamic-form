type FormModel = {
  name: string;
  description: string;
  createdAt: string;
  fields: FormElementModel[];
};

type FormElementModel = {
  required: boolean;
  name: string;
  dataType: 'STRING' | 'NUMBER';
};

export type { FormModel, FormElementModel };
