#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords2;

void main() {
	if (coords2.y > 0.5)
		gl_FragColor =  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); // amarelo
	else
	{
		gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // azul
	}
}