import {
  Badge,
  Blockquote,
  Group,
  Loader,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import { useGetLoans } from "client/client";
import { MdError } from "react-icons/md";

const BookDetailBorrower = () => {
  const loans = useGetLoans();

  if (loans.isError) {
    return (
      <Blockquote color="red" icon={<MdError />} mt="xl">
        データの取得に失敗しました
      </Blockquote>
    );
  }
  return (
    <Stack gap="sm" align="stretch" justify="flex-start">
      <Text fz={rem(18)}>借りている人</Text>
      {loans.isPending ? (
        <Loader color="blue" type="dots" />
      ) : (
        <Group gap={rem(7)}>
          {loans.data.data.loans.map(
            (loan) =>
              loan.users && (
                <Badge
                  key={`${loan.loans?.userId}-${loan.loans?.bookId}`}
                  variant="light"
                  color="rgba(0, 0, 0, 1)"
                  size="lg"
                >
                  {loan.users.name}
                </Badge>
              )
          )}
        </Group>
      )}
    </Stack>
  );
};

export default BookDetailBorrower;
