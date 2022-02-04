import React from "react";
import ReactGA from 'react-ga';

import styled, { css } from 'styled-components';
import {Section, Content, Item, ItemH, ItemBreak, A, H1, H2, H3, Image, P, Span, Anchor, Button, Showoff, FormSubmision, Input, TextField} from 'components/SharedStyling';

import { addresses, abis } from "@project/contracts";
import { useWeb3React } from '@web3-react/core'
import { ethers } from "ethers";

import Loader from 'react-loader-spinner'

import EPNSCoreHelper from 'helpers/EPNSCoreHelper';

import Airdrop from "segments/Airdrop";
import YieldFarming from 'segments/YieldFarming';
import NFT from 'segments/NFT';
import PushGovernance from 'segments/PushGovernance';

import ChannelsDataStore, { ChannelEvents } from "singletons/ChannelsDataStore";
import UsersDataStore, { UserEvents } from "singletons/UsersDataStore";


// Create Header
function Home({ setBadgeCount, bellPressed }) {
  ReactGA.pageview('/home');

  const { active, error, account, library, chainId } = useWeb3React();

  const [epnsReadProvider, setEpnsReadProvider] = React.useState(null);
  const [epnsWriteProvider, setEpnsWriteProvider] = React.useState(null);

  const [controlAt, setControlAt] = React.useState(1);
  const [adminStatusLoaded, setAdminStatusLoaded] = React.useState(false);
  const [channelAdmin, setChannelAdmin] = React.useState(false);
  const [channelJson, setChannelJson] = React.useState([]);



  // React.useEffect(() => {
  //   const contractInstance = new ethers.Contract(addresses.epnscore, abis.epnscore, library);
  //   setEpnsReadProvider(contractInstance);

  //   if (!!(library && account)) {
  //     let signer = library.getSigner(account);
  //     const signerInstance = new ethers.Contract(addresses.epnscore, abis.epnscore, signer);
  //     setEpnsWriteProvider(signerInstance);
  //   }

  // }, [account]);

  // React.useEffect(() => {
  //   // Reset when account refreshes
  //   setChannelAdmin(false);
  //   setAdminStatusLoaded(false);
  //   userClickedAt(0);
  //   setChannelJson([]);

  //   // EPNS Read Provider Set
  //   if (epnsReadProvider != null) {
  //     // Instantiate Data Stores
  //     UsersDataStore.instance.init(account, epnsReadProvider);
  //     ChannelsDataStore.instance.init(account, epnsReadProvider);

  //     checkUserForChannelRights();
  //   }

  // }, [epnsReadProvider]);


  // // Revert to Feedbox on bell pressed
  // React.useEffect(() => {
  //   setControlAt(4);
  // }, [bellPressed]);

  // handle user action at control center
  const userClickedAt = (controlIndex) => {
    setControlAt(controlIndex);
  }

  //Start Listening...
  const listenerForChannelRights = async () => {
    ChannelsDataStore.instance.addCallbacks(
      ChannelEvents.ADD_CHANNEL_SELF,
      "FromCreateChannel",
      () => {
        checkUserForChannelRights();
      }
    );
  }

  // Check if a user is a channel or not
  const checkUserForChannelRights = async () => {
    // Check if account is admin or not and handle accordingly
    EPNSCoreHelper.getChannelJsonFromUserAddress(account, epnsReadProvider)
      .then(response => {
        console.log(response);
        setChannelJson(response);
        setChannelAdmin(true);
        setAdminStatusLoaded(true);
      })
      .catch(e => {
        setChannelAdmin(false);
        setAdminStatusLoaded(true);
      });

    // Start listening
    listenerForChannelRights();
  }

  // Render
  return (
    <Container>
      <Controls>
        {/* <ControlButton index={0} active={controlAt == 0 ? 1 : 0} border="#e20880"
          onClick={() => {
            userClickedAt(0)
          }}
        >
          <ControlImage src="./svg/yield.svg" active={controlAt == 0 ? 1 : 0} />
          <ControlText active={controlAt == 0 ? 1 : 0}>Yield Farming</ControlText>
        </ControlButton> */}

        {/*
        <ControlButton index={1} active={controlAt == 1 ? 1 : 0} border="#35c5f3"
          onClick={() => {
            userClickedAt(1)
          }}
        >
          <ControlImage src="./svg/gratitude.svg" active={controlAt == 1 ? 1 : 0} />
          <ControlText active={controlAt == 1 ? 1 : 0}>Gratitude Drop</ControlText>
        </ControlButton>
        */}

        <ControlButton index={1} active={controlAt == 1 ? 1 : 0} border="#35c5f3"
          onClick={() => {
            userClickedAt(1)
          }}
        >
          <ControlImage src="./svg/delegate.svg" active={controlAt == 1 ? 1 : 0} />
          <ControlText active={controlAt == 1 ? 1 : 0}>Push Governance</ControlText>
        </ControlButton>

        <ControlButton index={2} active={controlAt == 2 ? 1 : 0} border="#674c9f"
          onClick={() => {
            userClickedAt(2)
          }}
        >
          <ControlImage src="./svg/rockstars.svg" active={controlAt == 2 ? 1 : 0} />
          <ControlText active={controlAt == 2 ? 1 : 0}>Rockstars of EPNS</ControlText>
        </ControlButton>

        <ControlButton index={4} active={controlAt == 4 ? 1 : 0} border="#e20880"
          onClick={() => {
            window.open("https://app.epns.io", "_blank")
          }}
        >
          <ControlImage src="./svg/epnslogo.svg" active={controlAt == 4 ? 1 : 0} />
          <ControlText active={controlAt == 4 ? 1 : 0}>#PushNotifs  </ControlText>
        </ControlButton>

      </Controls>
      <Interface>
        <Section>
          {controlAt == 0 &&
            <YieldFarming />
          }
          {/*{controlAt == 1 &&
            <Airdrop />
          }*/}
          {controlAt == 1 &&
            <PushGovernance
              epnsReadProvider={epnsReadProvider}
              epnsWriteProvide={epnsWriteProvider}
            />
          }
          {controlAt == 2 &&
            <NFT
              epnsReadProvider={epnsReadProvider}
              epnsWriteProvide={epnsWriteProvider}
            />
          }
          {controlAt == 3 &&
            <></>
          }
        </Section>

      </Interface>
    </Container>
  );
}

// css style
const Container = styled.div`
  flex: 1;
  display: block;
  flex-direction: column;
  min-height: calc(100vh - 100px);
`

const Controls = styled.div`
  flex: 0;
  display: flex;
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ControlButton = styled.div`
  flex: 1 1 10%;
  height: 120px;
  min-width: 100px;
  background: #fff;

  box-shadow: 0px 15px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 1px solid rgb(225,225,225);

  border-bottom: 10px solid rgb(180,180,180);
  margin: 20px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 10px solid ${(props) => props.active ? props.border : "rgb(180,180,180)"};

  &:hover {
    opacity: 0.9;
    cursor: pointer;
    pointer: hand;
  }
  &:active {
    opacity: 0.75;
    cursor: pointer;
    pointer: hand;
  }
`

const ControlImage = styled.img`
  height: 30%;
  margin-right: 15px;
  filter: ${(props) => props.active ? "brightness(1)" : "brightness(0)"};
  opacity: ${(props) => props.active ? "1" : "0.25"};

  transition: transform .2s ease-out;
  ${ props => props.active && css`
    transform: scale(2) translate(-20px, 0px);
    opacity: 0.4;
  `};
`

const ControlText = styled.label`
  font-size: 16px;
  font-weight: 200;
  opacity: ${(props) => props.active ? "1" : "0.75"};

  transition: transform .2s ease-out;
  ${ props => props.active && css`
    transform: scale(1.3) translate(-10px, 0px);
  `};
`

const ControlChannelContainer = styled.div`
  margin: 0px 20px;
  flex-direction: column;
  align-items: center;
  display: flex;
`

const ControlChannelImage = styled.img`
    width: 20%;
    margin-bottom: 10px;
    transition: transform .2s ease-out;
    ${ props => props.active && css`
      transform: scale(3.5) translate(-40px, 5px);
      opacity: 0.2;
      z-index: 1;
    `};
`

const ControlChannelText = styled.label`
  font-size: 16px;
  font-weight: 300;
  opacity: ${(props) => props.active ? "1" : "0.75"};
  transition: transform .2s ease-out;
  background: -webkit-linear-gradient(#db268a, #34c6f3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 2;
  ${ props => props.active && css`
    transform: scale(1.1) translate(0px, -20px);
  `};

`

const Interface = styled.div`
  flex: 1;
  display: flex;

  box-shadow: 0px 15px 20px -5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  border: 1px solid rgb(225,225,225);

  margin: 15px;
  overflow: hidden;
`

// Export Default
export default Home;
