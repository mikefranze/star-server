import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React from 'react'
import QuickPoll from '../ElectionForm/QuickPoll'
import useAuthSession from '../AuthSessionContextProvider'
import { useThemeSelector } from '../../theme'
import { StyledButton } from '../styles'
import { Button } from '@mui/material'

export default ({ }) => {
    const authSession = useAuthSession()
    const themeSelector = useThemeSelector()
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-evenly'
        }}>
            <Box maxWidth={700}>
                <Typography variant="h2" sx={{ m: 2 }} style={{ fontWeight: 700 }} >
                    Host your polls and elections
                </Typography>
                <Typography variant="h5" sx={{ m: 2 }} style={{
                    opacity: '0.7',
                }}>
                    Powered by Consensus Driven Voting Methods
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}>
                    <Button
                        type='button'
                        variant="contained"
                        sx={{
                            p: 2,
                            m: 2,
                            boxShadow: 2,
                            backgroundColor: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}>
                        Sign Up (its free)
                    </Button>
                    <Button
                        type='button'
                        variant="outlined"
                        sx={{
                            p: 2,
                            m: 2,
                            boxShadow: 2,
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}>
                        Learn More
                    </Button>
                </Box>
                <Box width={600} height={200} sx={{ m: 2, backgroundColor: 'secondary.main' }}>
                        Add Pick Here
                </Box>
            </Box>
            {process.env.REACT_APP_FF_ELECTION_TALLY === 'true' && 
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '70%',
                            marginLeft: '20px',
                            backgroundColor: themeSelector.mode === 'darkMode' ? 'brand.gray4' : 'brand.gray2',
                            p: { xs: 3, md: 3 },
                            gap: '40px',
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='h5' sx={{margin: 0}}>Elections Created</Typography>
                                <Typography variant='h5' sx={{margin: 0}}>10001</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Typography variant='h5' sx={{margin: 0}}>Votes Cast</Typography>
                                <Typography variant='h5' sx={{margin: 0}}>10001</Typography>
                            </Box>
                        </Box>
                    }
            <Box >
                <QuickPoll authSession={authSession} />
            </Box>
        </Box>
    )
}