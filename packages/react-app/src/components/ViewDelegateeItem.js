import React from "react";
import styled, { css } from 'styled-components';
import {Section, Content, Item, ItemH, ItemBreak, A, B, H1, H2, H3, Image, P, Span, Anchor, Button, Showoff, FormSubmision, Input, TextField} from 'components/SharedStyling';
import { Device } from 'assets/Device';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Loader from 'react-loader-spinner';

import Skeleton from '@yisheng90/react-loading';
import { FiTwitter } from 'react-icons/fi';
import { IoIosGift } from 'react-icons/io';
import { IoMdPeople } from 'react-icons/io';
import { GiTwoCoins } from 'react-icons/gi';
import Blockies from "components/BlockiesIdenticon";

import { useWeb3React } from '@web3-react/core';
import { ethers } from "ethers";
import { keccak256, arrayify, hashMessage, recoverPublicKey } from 'ethers/utils';

import EPNSCoreHelper from 'helpers/EPNSCoreHelper';
import ChannelsDataStore, { ChannelEvents } from "singletons/ChannelsDataStore";
import UsersDataStore, { UserEvents } from "singletons/UsersDataStore";

// Create Header
function ViewDelegateeItem({ delegateeObject, epnsReadProvider, epnsWriteProvide }) {
  const { account, library } = useWeb3React();

  const [ channelJson, setChannelJson ] = React.useState({});
  const [ subscribed, setSubscribed ] = React.useState(false);
  const [ loading, setLoading ] = React.useState(true);

  const [ txInProgress, setTxInProgress ] = React.useState(false);


  React.useEffect(() => {
    setLoading(false);
  }, [account, delegateeObject]);

 

  // toast customize
  const LoaderToast = ({ msg, color }) => (
    <Toaster>
      <Loader
       type="Oval"
       color={color}
       height={30}
       width={30}
      />
      <ToasterMsg>{msg}</ToasterMsg>
    </Toaster>
  )

  // render
  return (
    <>
    <Item
    key={delegateeObject.wallet}
    >
    <ChannelLogo
      theme={
        !!account && !!library ?
          "#e20880" : "#fff"
      }
    >
      <ChannelLogoOuter>
        <ChannelLogoInner>
          {loading &&
            <Skeleton color="#eee" width="100%" height="100%" />
          }
          {!loading &&
          <>
          <Image
            src={delegateeObject.src}
            srcSet={delegateeObject.srcSet}
            alt= {delegateeObject.name}
          />
          
           {/* <Blocky>
                 <Blockies seed={account.toLowerCase()} opts={{seed: account.toLowerCase(), size: 100, scale: 7}}/>
          </Blocky> */}
          </>
          }
        </ChannelLogoInner>
      </ChannelLogoOuter>

    {!!account && !!library &&
      <ItemH>
        <Anchor
                href={delegateeObject.url}
                target="_blank"
                title={"Visit Twitter profile of " + delegateeObject.name}
                bg="transparent"
                radius="4px"
              >
                <FiTwitter size={12} color="#e20880"/>
              </Anchor>
        <Span size="0.85em" color="#233234" spacing="0.2em" weight="400" textAlign="center">{delegateeObject.name}</Span>
          <Span size="0.5em" color="#233234" spacing="0.2em" weight="600" textAlign="center">Wallet Address: {delegateeObject.wallet}</Span>

        <ChannelActions>
          {loading &&
            <SkeletonButton>
              <Skeleton />
            </SkeletonButton>
          }
          {!!account && !!library && !loading &&
            <UnsubscribeButton >
              <ActionTitle onClick={() => {
              }}
                >Delegate</ActionTitle>
            </UnsubscribeButton>
          }
        </ChannelActions>
      </ItemH>
    }
    </ChannelLogo>
  </Item>
  </>
  );
}

// css styles
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;

  background: #fff;
  border-radius: 10px;
  border: 1px solid rgb(237, 237, 237);

  margin: 15px 0px;
  justify-content: center;
  padding: 10px;
`

const SkeletonWrapper = styled.div`
  overflow: hidden;
  width: ${props => props.atW + '%' || '100%'};
  height: ${props => props.atH}px;
  border-radius: ${props => props.borderRadius || 10}px;
  margin-bottom: ${props => props.marginBottom || 5}px;
  margin-right: ${props => props.marginRight || 0}px;
`

const ChannelLogo = styled.div`
  max-width: 100px;
  min-width: 250px;
  // min-width: 32px;
  flex: 1;
  margin: 5px;
  padding: 10px;
  border: 2px solid #fafafa;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
`

const ChannelLogoOuter = styled.div`
  padding-top: 100%;
  position: relative;
`

const ChannelLogoInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChannelLogoImg = styled.img`
  object-fit: contain;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
`

const ChannelInfo = styled.div`
  flex: 1;
  margin: 5px 10px;
  min-width: 120px;
  flex-grow: 4;
  flex-direction: column;
  display: flex;
`

const ChannelTitle = styled.div`
  margin-bottom: 5px;
`

const ChannelTitleLink = styled.a`
  text-decoration: none;
  font-weight: 600;
  color: #e20880;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
    pointer: hand;
  }
`

const ChannelDesc = styled.div`
  flex: 1;
  display: flex;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 400;
  flex-direction: column;
`

const ChannelDescLabel = styled.label`
  flex: 1;
`

const ChannelMeta = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 13px;
`

const ChannelMetaBox = styled.label`
  margin: 0px 5px;
  color: #fff;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
`

const Subscribers = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SubscribersCount = styled(ChannelMetaBox)`
  background: #35c4f3;
`

const Pool = styled.div`
  margin: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PoolShare = styled(ChannelMetaBox)`
  background: #674c9f;
`

const LineBreak = styled.div`
  display: none;
  flex-basis: 100%;
  height: 0;

  @media ${Device.tablet} {
    display: block;
  }
`

const ChannelActions = styled.div`
  margin: 5px;
  flex-grow: 1;
  max-width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChannelActionButton = styled.button`
  border: 0;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  margin: 10px;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  position: relative;
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
  ${ props => props.disabled && css`
    &:hover {
      opacity: 1;
      cursor: default;
      pointer: default;
    }
    &:active {
      opacity: 1;
      cursor: default;
      pointer: default;
    }
  `}
`

const ActionTitle = styled.span`
  ${ props => props.hideit && css`
    visibility: hidden;
  `};
`

const ActionLoader = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SkeletonButton = styled.div`
  border: 0;
  outline: 0;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 5px;
  flex: 1;
`

const SubscribeButton = styled(ChannelActionButton)`
  background: #e20880;
`

const UnsubscribeButton = styled(ChannelActionButton)`
  background: #674c9f;
`

const OwnerButton = styled(ChannelActionButton)`
  background: #35c5f3;
`

const Toaster = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 10px;
`

const ToasterMsg = styled.div`
  margin: 0px 10px;
`
const NFTTextStyle = styled.label`
  margin: 0px 5px;
  color: #fff;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
`
const NFTStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 10px;
  right: 10px;
`

const NFTStatusTitle = styled(NFTTextStyle)`
  background: #35c4f3;
`

const NFTClaim = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 10px;
  left: 10px;
`

const NFTClaimTitle = styled(NFTTextStyle)`
  background: #e20880;
`
const Blocky = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  transform: scale(0.85);
  outline-width: 2px;
  outline-color: rgba(225,225,225,1);
`
// Export Default
export default ViewDelegateeItem;
