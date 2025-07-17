"use client"
import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  padding: 0 20px;
  box-sizing: border-box;
  position: fixed;
`;

const TextAnimation = styled.div`
  font-size: 48px;
  font-family: Arial, sans-serif;
  color: #333;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-20px); }
    60% { transform: translateY(-10px); }
  }
`;

const MenuItem = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-family: Arial, sans-serif;
  padding: 5px 10px;
  border: 1px solid #333;
  border-radius: 5px;
  margin-left: 10px;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const LanguageMenu = styled.div`
  display: flex;
  gap: 10px;
`;

const Header = () => {
  return (
    <Container>
      <TextAnimation>It&apos;s a Joke!</TextAnimation>
      <LanguageMenu>
        <MenuItem href="#">English</MenuItem>
        <MenuItem href="#">Bangla</MenuItem>
        <MenuItem href="#">Login</MenuItem>
      </LanguageMenu>
    </Container>
  );
};

export default Header;