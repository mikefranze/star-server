import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { useThemeSelector } from '../../theme'

export default () => {

    const themeSelector = useThemeSelector()
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: themeSelector.mode === 'darkMode' ? 'brand.gray5' : 'brand.gray1',
            clip: 'unset',
            width: '100%',
            p: { justifyContent: 'center', xs: 2 },

        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                px:4
            }}>
                <Typography variant='h3' sx={{ margin: 0, fontWeight: 'bold' }}>10001</Typography>
                <Typography variant='h5' sx={{ margin: 0 }}>Elections Created</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                px:4
            }}>
                <Typography variant='h3' sx={{ margin: 0, fontWeight: 'bold' }}>10001</Typography>
                <Typography variant='h5' sx={{ margin: 0 }}>Votes Cast</Typography>
            </Box>
        </Box>
    )
}