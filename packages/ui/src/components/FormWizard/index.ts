import { FormWizardRoot } from "./FormWizard";
import { StepNav } from "./components/StepNav";
import { FormHeader } from "./components/FormHeader";
import { FormContainer } from "./components/FormContainer";
import { FormContent } from "./components/FormContent";
import { FormFooter } from "./components/FormFooter";
import { FormSeparator } from "./components/FormSeparator";

export const FormWizard = Object.assign(FormWizardRoot, {
  StepNav,
  Header: FormHeader,
  Container: FormContainer,
  Content: FormContent,
  Footer: FormFooter,
  Separator: FormSeparator,
});

export * from "./types";
export { StepNavProps } from "./components/StepNav";
export { useFormWizardContext } from "./hooks/useFormWizard";
