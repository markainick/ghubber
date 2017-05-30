// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Spinner, EventRow, Avatar } from 'components';
import { FeedTopPanel } from 'containers';
import { fetchAccountFeed } from 'actions';

// import flow types
import type { AccountFeedState } from 'reducers/account-feed';

type Props = {
    feed: AccountFeedState,
    fetchAccountFeed: typeof fetchAccountFeed
}

class FeedScreen extends PureComponent<void, Props, void> {
    componentWillMount() {
        this.props.fetchAccountFeed();
    }

    render() {
        const { loading, infinityLoading, error, events } = this.props.feed;

        if (loading || !events) {
            return (
                <View style={styles.container}>
                    <Spinner />
                </View>
            )
        }

        if (error) {
            return (
                <View style={styles.container}>
                    <Text>Oops! Error...</Text>
                </View>
            )
        }

        return (
            <View style={styles.root}>
                <FeedTopPanel />
                <FlatList
                    style={styles.list}
                    data={events}
                    keyExtractor={(repository) => repository.id}
                    refreshing={loading || infinityLoading}
                    renderItem={
                        ({ item }) => (
                            <EventRow
                                event={item}
                                onPress={() => null}
                            />
                        )
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    root: {
        flex: 1,
        marginHorizontal: 15
    },
    list: {
        flex: 0,
    }
})

export default connect(
    (state) => ({
        feed: state.accountFeed
    }),
    { fetchAccountFeed }
)(FeedScreen);
