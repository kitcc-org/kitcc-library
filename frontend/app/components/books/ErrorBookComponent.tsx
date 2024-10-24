import { Blockquote, Center } from '@mantine/core'
import { MdError } from "react-icons/md";

const ErrorBookComponent = () => {
  return (
    <Center h='70dh' w='100%'>
      <Blockquote color="red" icon={<MdError />} mt="xl">
        書籍情報を取得できませんでした。
      </Blockquote>
    </Center>
  )
}

export default ErrorBookComponent