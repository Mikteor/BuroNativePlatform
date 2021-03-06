import * as React from 'react';
import { SvgCss  } from 'react-native-svg';
 
const xml = `
<svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 113 91" style="enable-background:new 0 0 113 91;" xml:space="preserve">
<style type="text/css">
	.st0{fill:url(#SVGID_1_);}
	.st1{fill:url(#SVGID_2_);}
</style>
<radialGradient id="SVGID_1_" cx="55.6998" cy="54.913" r="38.6806" gradientTransform="matrix(0.9973 -7.365294e-02 7.365294e-02 0.9973 -1.821 3.7414)" gradientUnits="userSpaceOnUse">
	<stop  offset="0.5024" style="stop-color:#4556CE;stop-opacity:0.6"/>
	<stop  offset="1" style="stop-color:#6B75C1;stop-opacity:0.3"/>
</radialGradient>
<path class="st0" d="M18.6,50.3C8,42.1,13,25.1,26.4,23.9l23.7-2l34.9-1c10.7-0.3,18.1,10.5,14.1,20.4L84,77.4
	c-3.7,9-14.9,12-22.6,6L18.6,50.3z"/>
<radialGradient id="SVGID_2_" cx="55.4196" cy="43.6336" r="35.9521" gradientTransform="matrix(0.9973 -7.365294e-02 7.365294e-02 0.9973 -1.821 3.7414)" gradientUnits="userSpaceOnUse">
	<stop  offset="0.7448" style="stop-color:#4047C6;stop-opacity:0.7"/>
	<stop  offset="0.9173" style="stop-color:#5D97ED;stop-opacity:0.8099"/>
</radialGradient>
<path class="st1" d="M69.8,74.8c12.7,9.9,29.8-4.9,21.8-18.9L78.6,33c-2.5-4.3-0.8-9.8,3.7-12l0,0c4.6-2.3,5-6.4,3.2-9.9
	c-2.2-4.5-7.4-6.7-12.3-5.5L30.5,16.2c-11.1,2.8-14.2,17.1-5.1,24.2L69.8,74.8z"/>
</svg>
`;
 
export default () => <SvgCss  xml={xml} width="50%" height="50%" />;