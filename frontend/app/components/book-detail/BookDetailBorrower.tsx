import { Badge, Blockquote, Group, Loader, rem, Stack, Text } from '@mantine/core'
import { useGetLoans } from 'orval/client'
import { MdError } from "react-icons/md";

const BookDetailBorrower = () => {
  const loans = useGetLoans()

  if (loans.isError) {
    return (
      <Blockquote color="red" icon={<MdError />} mt="xl">
        データの取得に失敗しました
      </Blockquote>
    )
  }
  return (
    <Stack
      gap='sm'
      align='stretch'
      justify='flex-start'
    >
      <Text>借りている人</Text>
      {loans.isPending ? <Loader color='blue' type='dots' /> :
        <Group gap={rem(7)}>
          {loans.data.data.loans.map((loan) => loan.users &&
            <Badge key={loan.users.id} variant="light" color="rgba(0, 0, 0, 1)">
              {loan.users.name}
            </Badge>
          )}
        </Group>
      }
    </Stack>
  )
}

export default BookDetailBorrower