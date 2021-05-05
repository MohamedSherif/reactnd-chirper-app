import { saveLikeToggle, saveTweet } from '../utils/api'

import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOOGLE_TWEET = 'TOOGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet( tweet ) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet (text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading())

        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        })
        .then((tweet) => dispatch(addTweet(tweet)))
        .then(() => dispatch(hideLoading()))
    }
}

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
}

function toogleTweet ({ id, authedUser, hasLiked }) {
    return {
        type : TOOGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

export function handleToogleTweet (info){
    return (dispatch) => {
        dispatch(toogleTweet(info));

        return saveLikeToggle(info)
            .catch((e) => {
                console.warn('Error in handleToogleTweet: ', e);
                dispatch(toogleTweet(info));
                alert('There was an Error liking the tweet. Try again.')
            })
    }
}