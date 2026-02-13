import { useMemo, useState } from 'react'
import logo from '../images/logo.png'
import './App.css'

const tools = [
  {
    id: 'dtc-editor',
    name: 'DTC Editor',
    category: 'Diagnostics',
    summary: 'Disable or delete Diagnostic Trouble Codes (DTCs) from ECU files.',
    detail:
      'Identify and manage DTC entries with guided workflows, safe backups, and checksum-aware saves for supported ECUs.',
  },
  {
    id: 'ford-radio-codes',
    name: 'Ford Radio Codes',
    category: 'Security',
    summary: 'Generate radio unlock codes using authorized data inputs.',
    detail:
      'Supports common Ford/Visteon units with VIN/serial validation, batch tools, and exportable reports.',
  },
  {
    id: 'program-keys',
    name: 'Program Keys',
    category: 'Security',
    summary: 'Key programming utilities for supported vehicles and modules.',
    detail:
      'Step-by-step procedures with compatibility checks, guided pairing flows, and audit logging for authorized service use.',
  },
  {
    id: 'vag-dsg-immo-off',
    name: 'VAG DSG Immo-Off',
    category: 'Immobilizer',
    summary: 'Disable immobilizer on selected DSG/TCU controllers.',
    detail:
      'Compatible with DL382, DQ200/250/381/400/500 and related DSG TCUs with automated file patching.',
  },
  {
    id: 'vag-ecu-immobilizer',
    name: 'VAG ECU Immobilizer',
    category: 'Immobilizer',
    summary: 'Edit immobilizer parameters for supported VAG ECUs.',
    detail:
      'Coverage includes EDC17, MED17, ME7, ME9, PCR2.x, SID/Siemens and SIMOS families.',
  },
  {
    id: 'vag-tcu-immobilizer',
    name: 'VAG TCU Immobilizer',
    category: 'Immobilizer',
    summary: 'Edit immobilizer parameters for supported VAG TCUs.',
    detail:
      'Handles DL382, DQ200/250/381/400/500 and VL300/VL381 with guided module selection.',
  },
  {
    id: 'vag-bcm2-immobilizer',
    name: 'VAG BCM2 Immobilizer',
    category: 'Immobilizer',
    summary: 'Immobilizer data editing for BCM2 body control units.',
    detail:
      'Supports Audi A4/A5/Q5/A6/A7/A8 and VW Touareg BCM2 units with secure backups.',
  },
  {
    id: 'porsche-ecu-immobilizer',
    name: 'Porsche ECU Immobilizer',
    category: 'Immobilizer',
    summary: 'Edit immobilizer parameters for supported Porsche ECUs.',
    detail:
      'Coverage includes EDC17, ME7, MED17, SDI4/SDI6/SDI7/SDI8/SDI9 and SIMOS18 series ECUs.',
  },
  {
    id: 'vag-sgo-to-bin',
    name: 'VAG SGO to BIN Conversion',
    category: 'File Conversion',
    summary: 'Convert SGO factory firmware files to binary format.',
    detail:
      'Fast, checksum-aware conversion with project tracking and exportable metadata.',
  },
  {
    id: 'vag-frf-odx-sox-to-bin',
    name: 'VAG FRF/ODX/SOX to BIN',
    category: 'File Conversion',
    summary: 'Convert FRF, ODX and SOX firmware files to binary format.',
    detail:
      'Batch conversion with version detection and compatibility hints for supported ECUs.',
  },
  {
    id: 'vag-bin-to-sgo',
    name: 'VAG BIN to SGO Conversion',
    category: 'File Conversion',
    summary: 'Convert binary files to SGO factory firmware format.',
    detail:
      'Includes header generation, integrity checks, and packaging validation.',
  },
  {
    id: 'vag-bin-to-odx-frf',
    name: 'VAG BIN to ODX/FRF',
    category: 'File Conversion',
    summary: 'Convert binary files to ODX/FRF factory firmware format.',
    detail:
      'Template-driven conversion with metadata controls and output verification.',
  },
  {
    id: 'daimler-seed-key',
    name: 'Daimler Seed-Key',
    category: 'Security',
    summary: 'Calculate seed-key pairs for authorized programming access.',
    detail:
      'Compatible with supported Daimler ECUs and includes secure audit trails.',
  },
  {
    id: 'daimler-smr-f-to-bin',
    name: 'Daimler SMR-F to BIN',
    category: 'File Conversion',
    summary: 'Convert SMR-F factory firmware files to binary format.',
    detail:
      'Maintains segment integrity and supports batch processing for workshops.',
  },
  {
    id: 'checksum-correction',
    name: 'Checksum Correction',
    category: 'Utilities',
    summary: 'Automatic checksum correction for supported modules.',
    detail:
      'Detects and fixes checksum regions with detailed reports and rollback options.',
  },
  {
    id: 'vin-immo-repair',
    name: 'VIN/Immo Data Repair',
    category: 'Utilities',
    summary: 'Repair VIN and immobilizer data in supported files.',
    detail:
      'Guided repair workflows with validation rules and compatibility warnings.',
  },
]

const categories = ['All', 'Diagnostics', 'Security', 'Immobilizer', 'File Conversion', 'Utilities']

function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [activeTool, setActiveTool] = useState(null)
  const [documentationTool, setDocumentationTool] = useState(null)

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return tools.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category
      const matchesQuery =
        !normalizedQuery ||
        tool.name.toLowerCase().includes(normalizedQuery) ||
        tool.summary.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  const handleViewInADZDiag = (tool) => {
    // Forward request to ADZDiag platform
    const adzdiagUrl = `https://app.adzdiag.co.uk/tools/${tool.id}`
    window.open(adzdiagUrl, '_blank')
    setActiveTool(null)
  }

  const handleViewDocumentation = (tool) => {
    setActiveTool(null)
    setDocumentationTool(tool)
  }

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="brand">
          <img className="brand-logo" src={logo} alt="ADZDiag logo" />
        </div>
        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#dtc-editor">DTC EDITOR</a>
          <a href="#immobilizer">IMMOBILIZER</a>
          <a href="#firmware">FIRMWARE CONVERSION</a>
          <a href="#seed-key">SEED-KEY</a>
          <a href="#purchase">PURCHASE</a>
          <a href="#news">NEWS</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      <div className="hero-banner">
        <div className="circuit-overlay"></div>
      </div>
      
      <div className="title-section">
        <h1 className="main-title">ADZDiag</h1>
        <p className="main-subtitle">Automotive ECU Software Solutions</p>
        <button className="button button-buy">BUY NOW!</button>
      </div>

      <section id="tools" className="section">
        <h2 className="section-title">SUPPORTED FUNCTIONS</h2>
        
        <div className="filters-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search tools..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="chip-group">
            {categories.map((item) => (
              <button
                key={item}
                className={item === category ? 'chip chip-active' : 'chip'}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="tool-grid">
          {filteredTools.map((tool) => (
            <article key={tool.id} className="tool-card">
              <div className="tool-meta">
                <span>{tool.category}</span>
              </div>
              <h3>{tool.name}</h3>
              <p>{tool.summary}</p>
              <button className="button button-outline" onClick={() => setActiveTool(tool)}>
                More info
              </button>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Copyright © 2026 ADZDiag - All Rights Reserved.</p>
      </footer>

      {activeTool && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <span className="modal-category">{activeTool.category}</span>
                <h3>{activeTool.name}</h3>
              </div>
              <button className="button button-ghost" onClick={() => setActiveTool(null)}>
                Close
              </button>
            </div>
            <p>{activeTool.detail}</p>
            <div className="modal-actions">
              <button className="button button-primary" onClick={() => handleViewInADZDiag(activeTool)}>
                View in ADZDiag
              </button>
              <button className="button button-outline" onClick={() => handleViewDocumentation(activeTool)}>
                View documentation
              </button>
            </div>
          </div>
        </div>
      )}

      {documentationTool && (
        <div className="documentation-page">
          <div className="documentation-container">
            <button className="button button-ghost back-button" onClick={() => setDocumentationTool(null)}>
              ← Back to Tools
            </button>
            
            <div className="documentation-header">
              <span className="documentation-category">{documentationTool.category}</span>
              <h1>{documentationTool.name}</h1>
              <p className="documentation-intro">{documentationTool.detail}</p>
            </div>

            <div className="documentation-content">
              <section className="doc-section">
                <h2>Overview</h2>
                <p>
                  The {documentationTool.name} tool provides comprehensive capabilities for {documentationTool.summary.toLowerCase()}
                  This feature is designed for automotive workshops and technicians who need reliable, fast, and secure ECU modifications.
                </p>
              </section>

              <section className="doc-section">
                <h2>Key Features</h2>
                <ul className="feature-list">
                  <li>✓ Automated file detection and compatibility checking</li>
                  <li>✓ Secure backup creation before any modifications</li>
                  <li>✓ Checksum validation and automatic correction</li>
                  <li>✓ Detailed audit logs for compliance tracking</li>
                  <li>✓ Batch processing support for workshop efficiency</li>
                  <li>✓ Export verified outputs with comprehensive reports</li>
                </ul>
              </section>

              <section className="doc-section">
                <h2>How It Works</h2>
                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h3>Upload File</h3>
                      <p>Import your ECU or TCU file. The system automatically detects the file type and validates compatibility.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h3>Configure Settings</h3>
                      <p>Select your desired modifications or parameters. The interface guides you through each option with clear descriptions.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h3>Process & Verify</h3>
                      <p>Apply changes with automatic checksum correction. Review detailed logs and validation results.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h3>Download Output</h3>
                      <p>Export the modified file along with backup and compliance reports ready for programming.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="doc-section">
                <h2>Supported Platforms</h2>
                <p>
                  This tool is compatible with a wide range of ECU and TCU modules. Refer to the compatibility matrix 
                  in the ADZDiag platform for specific model numbers and firmware versions.
                </p>
              </section>

              <section className="doc-section">
                <h2>Best Practices</h2>
                <ul className="feature-list">
                  <li>Always create a backup before making modifications</li>
                  <li>Verify file checksums after processing</li>
                  <li>Review compatibility warnings carefully</li>
                  <li>Maintain audit logs for compliance purposes</li>
                  <li>Test on bench setups before vehicle installation</li>
                </ul>
              </section>

              <section className="doc-section">
                <h2>Get Started</h2>
                <p>
                  Ready to use {documentationTool.name}? Access the tool directly in the ADZDiag platform.
                </p>
                <div className="documentation-actions">
                  <button className="button button-primary" onClick={() => handleViewInADZDiag(documentationTool)}>
                    Open in ADZDiag
                  </button>
                  <button className="button button-outline" onClick={() => setDocumentationTool(null)}>
                    Back to Tools
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
