import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {Redirect} from "react-router-dom";

const styles = theme => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(6))]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
    },

    form: {
        width: "100%" // Fix IE 11 issue.
        // marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing(3),
        backgroundColor: "#4dd0e1"
    },
    site: {
        width: "100%"
    },
    media: {
        backgroundColor: "#4dd0e1",
        height: 100,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    layout: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8)
    },
    textField: {
        width: "100%"
    }
});
const languageID = [
    {
        value: ""
    },
    {
        value: "en-au",
        label: "English Australia"
    },
    {
        value: "zh-cn",
        label: "中文"
    },
    {
        value: "fr-fr",
        label: "Français"
    },
    {
        value: "es-419",
        label: "Español"
    },
    {
        value: "ja",
        label: "Japanese"
    },
    {
        value: "pt-br",
        label: "Português"
    },

    {
        value: "en-us",
        label: "English US"
    },
    {
        value: "en-gb",
        label: "English UK"
    }
];

const packages = [
    {
        value: ""
    },
    {
        value:
            '[ { "packageVersion": 1, "packageId": "84eb0146-e495-4179-a114-ee757f634e06" } ]',
        label: "Cognify (full)"
    },
    {
        value:
            '[ { "packageVersion": 1, "packageId": "aafd7992-dfbb-4cf1-9bd6-31ade8442b4e" } ]',
        label: "Cognify (no proofit)"
    },
    {
        value:
            '[ { "packageVersion": 1, "packageId": "b992a930-0d7c-4ece-934d-c1a319d63ee0" } ]',
        label: "Emotify"
    },
    {
        value:
            '[ { "packageVersion": 1, "packageId": "84eb0146-e495-4179-a114-ee757f634e06" },{ "packageVersion": 1, "packageId": "b992a930-0d7c-4ece-934d-c1a319d63ee0" } ]',
        label: "Cognify (full) and Emotify"
    },
    {
        value:
            '[ { "packageVersion": 1, "packageId": "aafd7992-dfbb-4cf1-9bd6-31ade8442b4e" },{ "packageVersion": 1, "packageId": "b992a930-0d7c-4ece-934d-c1a319d63ee0" } ]',
        label: "Cognify (no proofit) and Emotify"
    }
];

// this api key is for dev only
// const headers = {
//     'x-client-id': '69696969-6969-6969-6969-696969696969',
//     'x-api-key': 'r2zf4FdpQWaazJd1t9yj0aQ3vXXcfy7J1HYTfnIj',
//     'content-type': 'application/json'
// }

// this api-key is for staging
const headers = {
    "x-client-id": "69696969-6969-6969-6969-696969696969",
    "x-api-key": "jgosIzdwaV30zv5h9O7BfaMvZGcIqL8Y6qSr1EIP",
    "content-type": "application/json"
};

const adsUrl =
    "http://dev-hub-2.0.s3-website-ap-southeast-2.amazonaws.com/ads/";

// dev api
// const apiUrl = 'https://assessmentapi.dev.int.revelian.com/api/candidates'

// staging api
const apiUrl = "https://assessmentapi.staging.int.revelian.com/api/candidates/";
const revelianUrl =
    "http://revelian-staging-hub2.s3-website-ap-southeast-2.amazonaws.com/ads/";
const clientReference = "bef5513d-e4aa-4c78-a497-41ba5f54872f";
const gamesCompletedRedirectUrl = "https://d1rcpmq66cu07i.cloudfront.net";
const authenticateCandidateUrl =
    "https://assessmentapi.staging.int.revelian.com/api/token/";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tallyUp: 0,
            proofIt: 0,
            shortCuts: 0,
            resemble: 0,
            matchingFaces: 0,
            numBubbles: 0,
            gridLock: 0,
            emotionalTies: 0,
            languageID: "",
            getToken: "",
            getCandidateId: "",
            candidates: "",
            packages: [],
            redirect: false
        };
        this.handleCandidatesClick = this.handleCandidatesClick.bind(this);
        console.log(this.props);
    }

    async authorize() {
        await axios
            .post(authenticateCandidateUrl + this.state.getToken)
            .then(() => {
                console.log("candidate authenticated");
            });
    }

    handleCandidatesClick = async e => {
        e.preventDefault();
        const packages =
            '[ { "packageVersion": 1, "packageId": "84eb0146-e495-4179-a114-ee757f634e06" } ]';
        const data = {
            gamesCompletedRedirectUrl: gamesCompletedRedirectUrl,
            languageId: "en-au",
            clientReference: clientReference,
            timeScaleAdjustments: {
                TallyUp: 0,
                ProofIt: 0,
                ShortCuts: 0,
                Resemble: 0,
                MatchingFaces: 0,
                NumBubbles: 0,
                GridLock: 0,
                EmotionalTies: 0
            }
        };
        // data.packages = packages
        data.packages = JSON.parse(packages);
        // In Axios headers info need to go in config and body info go to data

        await axios.post(apiUrl, data, {headers: headers}).then(res => {
            this.setState({
                getToken: res.data.accessToken,
                getCandidateId: res.data.candidateId
            });
            // passing candidateId data to app then app pass to report
            this.props.candidateId(this.state.getCandidateId);
            // authorize the candidate
            this.authorize();
            // candidateUrl.push(revelianUrl + this.state.getToken);
            // candidateUrl.push(adsUrl + this.state.getToken);
            window.open(revelianUrl + this.state.getToken);
        });

        this.setState({
            redirect: true
        });
    };

    render() {
        const {classes} = this.props;
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to={"/candidate"}/>;
        }
        return (
            <div className={classes.main}>
                <CssBaseline/>
                <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item xs={12}>
                        <Paper className={classes.layout}>
                            <div className={classes.media}>
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    style={{color: "white"}}
                                >
                                    Candidate
                                </Typography>
                            </div>
                            <div className={classes.paper}>
                                <form className={classes.form}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.handleCandidatesClick}
                                    >
                                        Create
                                    </Button>
                                </form>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
