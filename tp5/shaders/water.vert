attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform sampler2D uSampler2;

uniform float timeFactor;

void main() {
	vec3 offset = vec3(0.0, 0.0, 0.0);

	vTextureCoord = aTextureCoord;

	vTextureCoord.x += timeFactor*0.1;
	vTextureCoord.y += timeFactor*0.1;

	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord);

	offset = aVertexNormal*filter.b*0.1;

	vec4 vertex = vec4(aVertexPosition+offset, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

}

