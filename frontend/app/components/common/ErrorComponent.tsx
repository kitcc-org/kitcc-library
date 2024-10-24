import { Blockquote, Center } from '@mantine/core'
import { MdError } from "react-icons/md";

interface ErrorComponentProps {
  message: string
}


const ErrorComponent = ({ message }: ErrorComponentProps) => {
  return (
    <Center h='70dh' w='100%'>
      <Blockquote color="red" icon={<MdError />} mt="xl">
        {message}
      </Blockquote>
    </Center>
  )
}

export default ErrorComponent