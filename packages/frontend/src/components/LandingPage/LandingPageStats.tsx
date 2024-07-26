import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { useGetGlobalElectionStats } from '~/hooks/useAPI';
import SlotCounter from 'react-slot-counter';
import { useSubstitutedTranslation } from '../util';
import { io } from 'socket.io-client';

interface FeaturePanel{
    title: string;
    text: string;
}

const socket = io('http://localhost:5001', {
    // https://stackoverflow.com/questions/69450485/receiving-error-xhr-poll-error-socket-io-client-react
    transports: ['websocket']
});

export default () => {
    let {t} = useSubstitutedTranslation('election');

    //const { data, isPending, error, makeRequest: fetchData } = useGetGlobalElectionStats();
    const [electionStats, setElectionStats] = useState({elections: 0, votes: 0})

    const containerRef = useRef(null);

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        console.log('emit join landing page')
        socket.emit('join_landing_page');
        //fetchData();
    }, []);

    // I don't understand this off/on pattern but with just the on there were many duplicate triggers
    socket.off('connect_error').on('connect_error', (err) => {
        console.info(`connect_error due to ${err.message}`);
    });
    socket.off('updated_stats').on('updated_stats', (stats) => {
        setElectionStats(stats);
    })

    const observer = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting))

    useEffect(() => observer.observe(containerRef.current as Element))

    return <Box
        sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md:'row'},
            margin: 'auto',
            width: '100%',
            maxWidth: '1300px',
            gap: '10rem',
            justifyContent: 'center',
        }}
        ref={containerRef}
    >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
        }}>
            <Typography variant='h4' sx={{margin: 0}}><SlotCounter value={visible? electionStats?.elections ?? 0 : 0 }/></Typography>
            <Typography variant='h5' sx={{margin: 0}}>{t('landing_page.election_stats.elections_created')}</Typography>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
        }}>
            <Typography variant='h4' sx={{margin: 0}}><SlotCounter value={visible? electionStats?.votes ?? 0 : 0 }/></Typography>
            <Typography variant='h5' sx={{margin: 0}}>{t('landing_page.election_stats.votes_cast')}</Typography>
        </Box>
    </Box>
}