import React, {
  useState,
} from 'react'

export default () => {
  const [cho, setCho] = useState('aaaa')

  return (
    <div
      onClick={() => setCho(`${cho}${cho}`)}
    >
      {cho}
      bbbbbcd
    </div>
  )
}
