"use client"

import React, { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

const Crisp_chat = () => {
  useEffect(() => {
    Crisp.configure("5cdb8683-d20b-4d16-a79b-5daf3dce9775")
  }, [])
  return null;
}

export default Crisp_chat