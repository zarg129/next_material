
import styles from '../../styles/Home.module.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Link from 'next/link';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Review from './Review';
import DatesForm from './DatesForm';
import PlaceInput from './PlaceInput';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'absolute',
  },
  layout: {
    width: '500',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: '200',
      marginRight: '200',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Selecting dates', 'Get address', 'Review your choise'];
const pages = ['/', '/PlaceInput.js', './Review.js' ];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DatesForm />;
    case 1:
      return <PlaceInput />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Page() {

  const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };

  return (
    <div className={styles.container}>
      
      <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  We have emailed your reservation confirmation!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                 
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        
      </main>
    </React.Fragment>
      
    </div>
  )
}
