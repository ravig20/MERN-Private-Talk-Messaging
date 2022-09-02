import { Badge, Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import React from 'react'

const UserBadgeIte = ({ user, removeHandler }) => {
    return (
        <Box
            px={0.5}
            py={1}
            m={0.5}
            mb={1}
            borderRadius="100%"
            fontSize={8}
            variant="solid"
            cursor="pointer"
            onClick={removeHandler}
        >
            <Badge bg='purple' color="white" > {user.name} < DeleteIcon w={3} h={3} /></Badge>
          
        </Box>
    )
}

export default UserBadgeIte