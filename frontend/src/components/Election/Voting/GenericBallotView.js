import React from "react";
import { useState } from 'react'
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {FaStar} from 'react-icons/fa';
import { Link } from "@mui/material";
import Box from '@mui/material/Box';

function HasExpandedData(candidate) {
  if (candidate.full_name) return true
  if (candidate.candidate_url) return true
  if (candidate.party) return true
  if (candidate.partyUrl) return true
  if (candidate.photo_filename) return true
  if (candidate.bio) return true
  return false
}

// Represents a single score of a single candidate
const Choice = ({ divKey, score, filled, onClick }) => (
  <div
    key={divKey}
    className={`circle ${filled ? "filled" : ""}`}
    onClick={onClick}
  >
    <p> {score} </p>
  </div>
);

// Represents the set of possible scores for a single candidate
const Choices = ({ rowIndex, onClick, score, columns }) =>
  columns.map((columnValue, n) => (
      <Grid item xs={1} align='center'>
        <Choice
          key={`starChoice${rowIndex}-${n}`}
          divKey={`starDiv${rowIndex}-${n}`}
          score={columns.length == 1 ? ' ' : columnValue}
          filled={columnValue === score}
          onClick={() => onClick(columnValue)}
        />
      </Grid>
    ));

// Represents the row of all data for a single candidate
const Row = ({ rowIndex, candidate, score, onClick, columns }) => {
  const [expanded, setExpanded] = useState(false)
  const hasExpandedData = HasExpandedData(candidate)
  var rowColor = 'white'
  if (rowIndex % 2 == 0) {
    rowColor = '#EDEDED';
  } else {
    rowColor = 'white';
  }
  return (
    <>
      <Grid container alignItems="center" style={{ backgroundColor: rowColor }} className="row">
        <Grid item xs={1} >
          {!expanded && hasExpandedData &&
            <IconButton aria-label="Home" onClick={() => { setExpanded(true) }}>
              <ExpandMore />
            </IconButton>}
          {expanded &&  hasExpandedData &&
            <IconButton aria-label="Home" onClick={() => { setExpanded(false) }}>
              <ExpandLess />
            </IconButton>}
        </Grid>
        <Grid item xs={4}>
          <Typography wrap className="rowHeading" sx={{wordwrap: "break-word"}} align={columns.length==1? 'right' : 'left'} variant="h6" component="h6">
            {candidate.candidate_name}
          </Typography>
        </Grid>
        <Choices
          key={`starChoices${rowIndex}`}
          rowIndex={rowIndex}
          score={score}
          onClick={onClick}
          columns={columns}
        />
      </Grid>
      {expanded && hasExpandedData &&
      <>
        <Grid container style={{ backgroundColor: rowColor }}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={5}>
            {candidate.full_name &&
            <Typography align='left' component="h6">
              {candidate.full_name}
            </Typography>}
            {candidate.candidate_url && <Link color="inherit" href={candidate.candidate_url} target="_blank" underline="always">
              <Typography align='left' component="h6">
                Candidate URL
              </Typography>
            </Link>}
            {candidate.party &&
              <Typography align='left' s component="h6">
                {`Party: ${candidate.party}`}
              </Typography>}
            {candidate.partyUrl &&
              <Link color="inherit" href={candidate.partyUrl} target="_blank" underline="always">
                <Typography align='left' component="h6">
                  Party URL
                </Typography>
              </Link>}
          </Grid>
          {candidate.photo_filename &&
          <Grid item xs={6}>
            <img src={candidate.photo_filename} style={{ width: 200, height: 200 }} />
          </Grid>}
          </Grid>
          
          <Grid container style={{ backgroundColor: rowColor }}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={8}>
            <Typography align='left' s component="p" style={{whiteSpace: 'pre-line'}}>
              {candidate.bio}
            </Typography>
          </Grid>
        </Grid>
        </>
      }

    </>
  )
};

// Represents the list of rows corresponding to the list of candidates
const Rows = ({ candidates, scores, onClick, columns }) =>
  candidates.map((row, n) => (
    <>
      <Row
        rowIndex={n}
        key={`starRow${n}`}
        candidate={row}
        party={row.party}
        score={scores[n]}
        onClick={(score) => onClick(n, score)}
        columns={columns}
      />
      <Divider className="rowDivider"/>
    </>
  ));

// Represents the list of column headings for all possible scores
const ColumnHeadings = ({starHeadings, columns, leftTitle, rightTitle, headingPrefix}) => (
  <>
  { leftTitle != '' &&
    <Grid container alignItems="stretch" >
      <Grid item xs={5}></Grid>
      <Grid item xs={1}>
        <Typography align='center' className="columnDescriptor">
          {leftTitle}
        </Typography>
      </Grid>
      <Grid item xs={columns.length-2}></Grid>
      <Grid item xs={1}>
        <Typography align='center' className="columnDescriptor">
          {rightTitle}
        </Typography>
      </Grid>
    </Grid>
  }
    <Grid container alignItems="stretch">
      <Grid item xs={5}>
        { headingPrefix != '' &&
          <Typography className="headingPrefix">
            {headingPrefix}
          </Typography>
        }
      </Grid>
      {columns.length > 1 &&
        <ScoreColumnHeadings starHeadings={starHeadings} columns={columns}/>
      }
    </Grid>
  </>
);

const ScoreIcon = ({color, value}) => (
  <div align='center' style={{width: '50px', height: '50px'}}>
    <FaStar style={{color: color}} className="starIcon"/>
    <Typography className="scoreColumnHeading">
      {value}
    </Typography>
  </div>
)

const ScoreColumnHeadings = ({starHeadings, columns}) =>
  columns.map((columnTitle, n) => (
    <Grid item xs={1}>
      { starHeadings &&
        <ScoreIcon
          color={(n != 0)? '#CCCCCC' : '#FFFFFF'}
          value={columnTitle}
        />
      }
      { !starHeadings && 
        <Typography align='center' variant="h6" component="h6">
          <b>{columnTitle}</b>
        </Typography>
      }
    </Grid>
  ));

export default function GenericBallotView({
  race,
  candidates,
  scores,
  onClick,
  columns,
  instructions,
  columnValues=null,
  leftTitle='',
  rightTitle='',
  headingPrefix='',
  footer='',
  starHeadings=false,
  warning=null,
}) {
  if(columnValues == null){
    columnValues = columns
  }
  return (
      <Box border={2} sx={{ mt: 5, ml: 0, mr: 0, width: '100%' }} className="ballot">
        <Grid container alignItems="center" justify="center" direction="column">

          <Grid item style={{ padding: '0.8cm 0cm 0cm 0cm' }}>
            <Typography align='center' gutterBottom variant="h2" component="h6" className="title">
              {race.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography align='center' gutterBottom variant="h6" component="h6" style={{whiteSpace: 'pre-line'}}>
              {race.description}
            </Typography>
          </Grid>

          <Grid item xs={8} className="instructions">
            {instructions}
          </Grid>

          <ColumnHeadings
            starHeadings={starHeadings}
            columns={columns}
            leftTitle={leftTitle}
            rightTitle={rightTitle}
            headingPrefix={headingPrefix}
          />
          <Divider className="rowDivider"/>
          <Rows candidates={candidates} scores={scores} onClick={onClick} columns={columnValues}/>

          <Grid item xs={10} className="footer">
            {footer}
          </Grid>

          { warning !== null &&
            <Box style={{backgroundColor: '#FFFF88', marginLeft:'10%', marginRight:'10%', marginBottom:'.4cm', padding: '.2cm'}}>
              <Typography>⚠️</Typography>
              <Typography style={{paddingLeft:'30px'}}>{warning}</Typography>
            </Box>
          }
        </Grid>
      </Box>
  );
}