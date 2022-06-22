import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logodog.png";
import LoveEmoji from "../assets/loveLogo.png";
import AngryEmoji from "../assets/logo.png";
import CovidEmoji from "../assets/covid-emoji.png";
import sky from "../assets/bg-match.jpg";
import loader from "../assets/angryface.gif";
import axios from "axios";
import { friendRequestRoute } from "../utils/APIRoutes";
export default function Match() {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [friendRequest, setFriendRequest] = useState(false);
  const [matchBox, setMatchBox] = useState(0);
  useEffect(async () => {
    setUser(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      )
    );
  }, []);
  useEffect(async () => {
    if (user) {
      if (user.matchs.length > 0) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const time = new Date().getMonth() + 1 + "月" + new Date().getDate() + "日";
    console.log(time);
    const { data } = await axios.post(`${friendRequestRoute}/`, {
      userID: user._id,
      friendID: user.matchs[matchBox]._id,
      time,
    });
    changeFriendRequest();
  };
  const changeFriendRequest = () => {
    setFriendRequest(true);
    console.log(friendRequest);
  };

  const changeMatchBox = () => {
    if (matchBox < user.matchs.length - 1) {
      const count = matchBox + 1;
      setMatchBox(count);
      setFriendRequest(false);
      console.log(matchBox);
    }
    // console.log(matchBox);
  };

  return (
    <>
      {isLoading ? (
        <FormContainer>
          <img src={loader} alt="loader" className="loader" />
          <h1>Waiting for next match !</h1>
        </FormContainer>
      ) : (
        <FormContainer>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img
                src={`data:image/svg+xml;base64,${user.matchs[matchBox].avatarImage}`}
                alt=""
              />
              <h1>
                {user.matchs[matchBox].username}({user.matchs[matchBox].age})
              </h1>
            </div>
            <div className="info-match">
              {user.matchs[matchBox].gender === "boy" ? (
                <h1>{user.matchs[matchBox].major}男同學 </h1>
              ) : (
                <h1>{user.matchs[matchBox].major}女同學</h1>
              )}
              <h1>
                {"\u00A0\u00A0\u00A0\u00A0"} 我是{user.matchs[matchBox].home}
                人!!
              </h1>
            </div>

            <div className="info-match">
              <img src={LoveEmoji} alt="logo" />
              <h1>喜歡:</h1>

              {user.matchs[matchBox].habits.map((habit, index) => {
                return (
                  <p>
                    {habit}
                    {"\u00A0"}
                  </p>
                );
              })}
              <p>別人的一切</p>
            </div>

            <div className="info-match">
              <img src={AngryEmoji} alt="logo" />
              <h1>討厭: </h1>
              {user.matchs[matchBox].hates.map((hate) => {
                return (
                  <p>
                    {hate}
                    {"\u00A0"}
                  </p>
                );
              })}
            </div>
            <div className="info-match">
              <img src={Logo} alt="logo" />
              <h1>常出沒:</h1>
              {user.matchs[matchBox].gangs.map((gang, index) => {
                return (
                  <p>
                    {gang}
                    {"\u00A0"}
                  </p>
                );
              })}
            </div>
            <div className="info-match">
              <img src={CovidEmoji} alt="logo" />
              <h1>有無確診經驗:</h1>
              <p>{user.matchs[matchBox].positive}</p>
            </div>
            <div className="button-div">
              {matchBox === user.matchs.length - 1 ? (
                <button
                  type="button"
                  onClick={() => changeMatchBox()}
                  disabled={true}
                >
                  No others match today QQ
                </button>
              ) : (
                <button type="button" onClick={() => changeMatchBox()}>
                  Next
                </button>
              )}

              {friendRequest ? (
                <button
                  type="button"
                  className="selected"
                  disabled={friendRequest}
                >
                  friend request has send!
                </button>
              ) : (
                <button type="submit">Send</button>
              )}
            </div>
          </form>
        </FormContainer>
      )}
    </>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: url(${sky});
  background-size: cover;
  border-left: 0.01rem solid black;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 3rem;
    }
    h1 {
      color: black;
    }
  }

  .info-match {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.01rem;
    img {
      height: 2rem;
    }
    h1,
    p {
      flex-direction: row;
      background-color: transparent;
      color: black;
      justify-content: flex-start;
      font-size: 1rem;
      height: 1rem;
    }
  }
  .button-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 2rem;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 5rem;
    width: 80%;
  }
  button {
    background-color: #ff6f47;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  .selected {
    background-color: #9a86f3;
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
