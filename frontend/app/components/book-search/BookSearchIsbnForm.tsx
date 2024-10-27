import { TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { GetBooksParams } from "client/client.schemas";

interface SearchIsbnFormProps {
  form: UseFormReturnType<
    GetBooksParams,
    (values: GetBooksParams) => GetBooksParams
  >;
}

const BookSearchIsbnForm = ({ form }: SearchIsbnFormProps) => {
  return (
    <TextInput
      label="ISBN"
      placeholder="10桁または13桁のISBN"
      key={form.key("isbn")}
      {...form.getInputProps("isbn")}
    />
  );
};

export default BookSearchIsbnForm;
