import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class InformationVideo extends Component {
    
    getUrl = (productName,videoUrlList) => {
        if(productName === '무배당THE건강한치아보험V' || productName === '무배당THE든든한실버치아보험'){
            return(videoUrlList[0].url)
        }else if(productName === '무배당전에없던실속치매보험' || productName === '무배당간병비계속주는치매보험'){
            return(videoUrlList[1].url)
        }else if(productName === '무배당THE건강해지는종신보험' ||productName === '무배당THE간편고지종신보험'){
            return(videoUrlList[3].url)
        }else if(productName === '무배당라이나퍼펙트케어암보험' ||productName === '무배당초간편역시라이나암보험'){
            return(videoUrlList[2].url)
        }else {
            return(videoUrlList[4].url)
        }
    }

    render() {
        return (
            <div >
                    <ReactPlayer
                        className='react-player'
                        url={this.getUrl(this.props.productName,
                                this.props.videoUrlList)}
                        playing
                        controls
                        width='100%'
                        height='100%'
                        />
            </div>
        );
    }
}


export default InformationVideo;