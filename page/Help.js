import React, { Component } from 'react';
import ReactNative, {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import { ENGLISH, HINDI } from "../config";

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

import pageStyles, { A, H2, Em, Bull, P, Strong, BullHeader, BullHeaderMain } from "./styles.js";


export class SectionedScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageHeight: 500
        };
    }
    _scrollTo(name, animated=false) {
        let child = this.refs[name];

        if (child) {
            let nodeHandle = ReactNative.findNodeHandle(this._scroller);
            child.measureLayout(nodeHandle, (_x, y) => {
                this._scroller.scrollTo({x: 0, y: y-20, animated: animated});
            }, (error) => {
                console.log(error);
            })
        }
    }

    onLayout = (e) => {
        this.setState({ pageHeight: e.nativeEvent.layout.height });

        if (this.props.selected)
            this._scrollTo(this.props.selected);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selected && prevProps !== this.props.selected)
            this._scrollTo(this.props.selected, true);
    }

    render() {
        let {children, style} = this.props,
            {pageHeight} = this.state;

        return (
            <ScrollView ref={scroller => { this._scroller = scroller; }}
                        style={style}
                        onLayout={ this.onLayout }
                        stickyHeaderIndices={children.map((_, i) => i*2)}>
                {React.Children.map(children, (section) => {
                     let {title, icon} = section.props,
                         iconComponent = icon && (<Image source={icon} style={styles.sectionIcon}/>);
                     return [
                         (<View>
                             <Text style={styles.sectionTitle}>
                                 { section.props.title }
                             </Text>
                         </View>),
                         (<View ref={section.key} style={[styles.section, {minHeight: pageHeight}]}>
                             { section.props.children }
                         </View>)
                     ];
                })}
                {children}
            </ScrollView>
        );
    }
}


// Placeholder
const Section = (props) => (<Text/>);


export default class HelpPage extends Component {
    render() {
        let {navigation} = this.props,
            {params} = navigation.state,
            gotoSection = (section) => { navigation.setParams({ section: section })};

        let SLink = ({children, s}) => (
            <A onPress={() => navigation.setParams({ section: s })}>{children}</A>);

        return (
            <SectionedScroller selected={params.section}
                               style={{backgroundColor: "white"}}>
                <Section title="Home" key="home">
                    <P>
                        <Strong>Objects:</Strong> To play a video clip, select
                        one of the Objects at the top of the page. Each video will feature
                        the women in the photograph, and will relate in some way to the
                        Object you selected.
                    </P>
                    <P>
                        <Strong>More Objects:</Strong> You can see more stories
                        by tapping the arrows ({'< >'}) or swiping to the left or right. 
                    </P>
                    <P>
                        <Strong>Remnants:</Strong> After viewing 2 videos a new
                        choice becomes available in the navigation bar at the bottom of the
                        screen. (See <SLink s="remnants">Remnants</SLink> section).
                    </P>
                </Section>
                <Section title="Share Your Video Story" key="share">
                    <P>
                        Share your own story. By sharing more strategies you will
                        help other women arm themselves and reclaim the city.
                    </P>
                    <P>
                        <Strong>Recording Video:</Strong> (generic how to & links to 3rd-party
                        advice?)
                    </P>
                    <P>
                        <Strong>Uploading Video:</Strong> (find your video on your phone & upload)
                    </P>
                    <P>
                        <Strong>Deleting Video:</Strong> (how to request to have your video removed)
                    </P>
                    <P>
                        <Strong>Notification:</Strong> (is there such a thing? how do they know
                        video has been deleted?)
                    </P>
                </Section>
                <Section title="Remnants" key="remnants">
                    <P>
                        <Strong>Objects:</Strong> To play a video clip, select one of the Objects at the top of the page. Each video will feature the women in the photograph, and will relate in some way to the Object you selected.
                    </P>
                    <P>
                        <Strong>More Objects:</Strong> You can see more stories by tapping the arrows or swiping to the left or right.
                    </P>
                    <P>
                        <Strong>Remnants:</Strong> After viewing 2 videos a new choice becomes available in the navigation bar at the bottom of the screen. (See Remnants section).
                    </P>
                </Section>
                <Section title="Resources">
                    <P><Em>I’m interested in knowing more</Em></P>
                    <P>Visit <A href="http://www.aashiyaan.org">www.aashiyaan.org</A> to learn more about the co-creators, their stories and experiences of the city of Delhi.</P>
                    <P><Em>How Can I Help?</Em></P>
                    <P>Share your favourite stories (especially strategies!) with #AashiyaanStories on social media so others can also watch, learn, contribute and reclaim the city.</P>
                    <P>Organize a living room or porch conversation with homemakers and domestic workers about their city experiences and strategies. Contact us for ideas and to share post discussion photos and videos on our <A href="http://www.aashiyaan.org">website</A>.</P>
                    <P>Go to our <A href="https://www.youtube.com/playlist?list=PLTXq6Eg-6vhrYDlEKZVYURf1JOSoHkRJz">YouTube channel</A> and add a translation in your local language. Let’s keep the conversation going!</P>
                </Section>
            </SectionedScroller>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    section: {
    },

    sectionTitle: {
        backgroundColor: "white",
        borderTopColor: "#aaa",
        borderTopWidth: 1,
        fontWeight: "bold",
        fontSize: 16,
        height: 25,
        paddingLeft: 10
    }
})

HelpPage.navConfig = {
    screen: HelpPage,

    navigationOptions: ({navigation}) => ({
        headerStyle: pageStyles.header,
        headerTitle: "How to Use"
    })
}