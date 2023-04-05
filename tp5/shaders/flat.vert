attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec4 vPosition;

uniform float normScale;

uniform float uTime;


void main() {
	float offsetX = normScale * sin(vPosition.y * 10.0 + uTime * 10.0);
    vec3 newPosition = vec3(aVertexPosition.x + offsetX, aVertexPosition.y, aVertexPosition.z);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	vPosition = gl_Position;
}

