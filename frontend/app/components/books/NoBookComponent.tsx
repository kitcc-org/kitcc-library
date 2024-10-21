import { Blockquote, Center } from '@mantine/core'
import { CiWarning } from "react-icons/ci";

const NoBookComponent = () => {
  return (
    <Center h='70dh' w='100%'>
      <Blockquote color="yellow" icon={<CiWarning />} mt="xl">
        本が登録されていません。
      </Blockquote>
    </Center>
  )
}

export default NoBookComponent