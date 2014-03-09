ParticleEnginePresets =

{

	Snow :
	{
		positionStyle    : Type.CUBE,
				
		velocityStyle    : Type.CUBE,
		velocityBase     : new THREE.Vector3( 0, -60, 0 ),
		velocitySpread   : new THREE.Vector3( 50, 20, 50 ), 
		accelerationBase : new THREE.Vector3( 0, -10,0 ),
		
		sizeBase    			: 4.0,
		angleBase               : 0,
		angleSpread             : 720,
		angleVelocityBase       :  0,
		angleVelocitySpread     : 60,
		
		particleTexture : THREE.ImageUtils.loadTexture( 'images/particles/snowflake6.png' ),
			
		sizeTween    : new Tween( [0.25, 2], [1, 15] ),
		colorBase   : new THREE.Vector3(0.66, 1.0, 0.9), // H,S,L
		opacityTween : new Tween( [8, 10], [0.8, 0] ),

		particleDeathAge   : 10,	
		emitterDeathAge    : 10
	},
	
	Rain :
	{
		positionStyle    : Type.CUBE,

		velocityStyle    : Type.CUBE,
		velocityBase     : new THREE.Vector3( 0, -1200, 0 ),
		velocitySpread   : new THREE.Vector3( 10, 50, 10 ), 
		accelerationBase : new THREE.Vector3( 0, -10,0 ),
		
		particleTexture : THREE.ImageUtils.loadTexture( 'images/particles/raindrop2flip.png' ),

		sizeBase    : 4.0,
		sizeSpread  : 8.0,
		colorBase   : new THREE.Vector3(0.66, 1.0, 0.7), // H,S,L
		colorSpread : new THREE.Vector3(0.00, 0.0, 0.2),
		opacityBase : 0.6,

		particleDeathAge   : 1.0,		
		emitterDeathAge    : 60
	},
	
	Candle :
	{
		positionStyle  : Type.SPHERE,
		positionBase   : new THREE.Vector3( -250, 0, 250 ),
		positionRadius : 2,
		
		velocityStyle  : Type.CUBE,
		velocityBase   : new THREE.Vector3(0,100,0),
		velocitySpread : new THREE.Vector3(20,0,20),
		
		particleTexture : THREE.ImageUtils.loadTexture( 'images/particles/smokeparticle.png' ),
		
		sizeTween    : new Tween( [0, 0.3, 2], [50, 200, 1] ),
		opacityTween : new Tween( [0.9, 2], [1, 0] ),
		colorTween   : new Tween( [0, 2], [ new THREE.Vector3(0.12, 1, 0.5), new THREE.Vector3(-0.1, 1, 0) ] ),
		//blendStyle : THREE.AdditiveBlending,  
		
		particlesPerSecond : 60,
		particleDeathAge   : 1.5,		
		emitterDeathAge    : 60
	}
	
}