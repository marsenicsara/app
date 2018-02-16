import React from "react"
import Lazyload from "react-lazyload"

import "./collaboration.css"

const Collaboration = () => {
  return (
    <section className="pure-g pure-centered Collaboration">
      <div className="pure-u-1-1 pure-u-lg-5-6">
        <div className="pure-g pure-centered">
          <div className="pure-u-1-1 pure-u-md-1-3">
            <Lazyload
              height={166}
              offset={200}
            >
              <img
                width={166}
                height={166}
                src="assets/web/Images/handshake.png"
                alt="Samarbete"
              />
            </Lazyload>
            <div className="pure-g pure-centered">
              <p className="pure-u-1-1 pure-u-lg-5-6">Hedvig är tryggat av InterHannover, del av en av världens största återförsäkringskoncerner</p>
            </div>
          </div>
          <div className="pure-u-1-1 pure-u-md-1-3">
            <Lazyload
              height={166}
              offset={200}
            >
              <img
                width={166}
                height={166}
                src="assets/web/Images/AA.png"
                alt="Samarbete"
              />
            </Lazyload>
            <div className="pure-g pure-centered">
              <p className="pure-u-1-1 pure-u-lg-5-6">AA-rating från<br/>Standard &amp; Poor's</p>
            </div>
          </div>
          <div className="pure-u-1-1 pure-u-md-1-3">
            <Lazyload
              height={166}
              offset={200}
            >
              <img
                width={166}
                height={166}
                src="assets/icons/authorized.svg"
                alt="samarbete"
              />
            </Lazyload>
            <div className="pure-g pure-centered">
              <p className="pure-u-1-1 pure-u-lg-5-6">Hedvig är auktoriserat av Finansinspektionen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collaboration