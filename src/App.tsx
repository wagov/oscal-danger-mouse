import { useState } from 'react'
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import jsonata from 'jsonata';
import './App.css'

import ism_oscal from "./controls/ISM_catalog.json";

// Export some tools for testing
(window as any).oscaldm = {
  ism_oscal: ism_oscal,
  jsonata: jsonata
}

function App() {
  const [count, setCount] = useState(0)

  const schema: RJSFSchema = {
    title: 'Todo',
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', title: 'Title', default: 'A new task' },
      done: { type: 'boolean', title: 'Done?', default: false },
    },
  };

  const log = (type: string) => console.log.bind(console, type);

  return (
    <>
      <div>
        <Form
          schema={schema}
          validator={validator}
          onChange={log('changed')}
          onSubmit={log('submitted')}
          onError={log('errors')}
        />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
