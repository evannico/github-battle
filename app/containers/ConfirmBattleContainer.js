/**
 * Created by evannico on 12/6/16.
 */
var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            isLoading: true,
            playersInfo: []
        }
    },
    componentDidMount: function () {
        //fetch info from Github api then update state
        var that = this;
        var query = this.props.location.query;
        githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
            .then(function (players) {
                that.setState({
                    isLoading: false,
                    playersInfo: [players[0], players[1]]
                })
            })
    },
    handleInitiateBattle: function () {
        this.context.router.push({
            pathname: '/results',
            state: {
                playersInfo: this.state.playersInfo
            }
        })
    },
    render: function () {
        return (
            <ConfirmBattle
                isLoading={this.state.isLoading}
                onInitiateBattle={this.handleInitiateBattle}
                playersInfo={this.state.playersInfo} />
        )
    }
});

module.exports = ConfirmBattleContainer;