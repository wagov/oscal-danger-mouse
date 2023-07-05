import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import jsonata from 'jsonata';
import './App.css'

import ism_oscal from "./controls/ISM_catalog.json";
const control_query = 'catalog.groups.groups.groups.controls.props[name = "essential-eight-applicability"].%';
const controls = await jsonata(control_query).evaluate(ism_oscal);

// Export some tools for testing
(globalThis as any).oscaldm = {
  ism_oscal: ism_oscal,
  jsonata: jsonata,
  controls: controls
}

function App() {
  const choices = ["Not Implemented", "Partially Implemented", "Largely Implemented", "Fully Implemented"];

  const control_fields: { [x: string]: any; } = {};
  controls.forEach((control: { [x: string]: any; }) => {
    control_fields[control["id"]] = {
      type: 'string',
      title: control.title + " (E8 " + control.props.filter((prop: { name: string; }) => prop.name == "essential-eight-applicability")[0].value + ")",
      description: control.parts[0].prose,
      enum: choices,
      default: choices[0]
    }
  })
  
  const schema: RJSFSchema = {
    title: 'ACSC ISM Controls',
    type: 'object',
    properties: control_fields
  };

  return (
    <>
      <h1>OSCAL Danger Mouse</h1>
      <p>Controls from <a href="https://www.cyber.gov.au/resources-business-and-government/essential-cyber-security/ism/oscal">ISM catalog</a> filtered with jsonata query:
        <pre>{control_query}</pre>
      </p>
      <div>
        <Form
          schema={schema}
          validator={validator}
        />
      </div>
    </>
  )
}

export default App
