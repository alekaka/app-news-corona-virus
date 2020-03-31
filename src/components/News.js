import React, { useState } from 'react';
import {
    Text
  } from 'react-native';

export default function News({route, navigation}) {
  return (
    <>
        <Text>{route.params.title}</Text>
    </>
  );
}