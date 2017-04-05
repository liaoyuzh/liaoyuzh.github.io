.equ ADDR_JP1, 0xFF200060
.equ HEX, 0xFF200020
.equ TIMER1, 0xFF202000 
.global _start

#some constant variable
# r8 ADDR_JP1
# r7 HEX
# r6 TIMER1
# r19 hexdisplay

# r9 movia address
# r10 movi constant

_start:
	movia  r8, ADDR_JP1     
	movia  r7, HEX
	movia  r6, TIMER1

	movia  r9, 0x07f557ff       # set direction for motors and sensors to output and sensor data register to inputs
	stwio  r9, 4(r8)

sensor3_ready:
	movia  r9, 0xfffefffc     # enable sensor 3, hold the hammer (forward motor 0)
	stwio  r9, 0(r8)
	ldwio  r5,  0(r8)          # checking for valid data sensor 3
	srli   r4,  r5, 17          # bit 17 is valid bit for sensor 3           
	andi   r4,  r4, 0x1
	bne    r0,  r6, sensor3_ready        # wait for valid bit to be low: sensor 3 needs to be valid

sensor3:
	srli   r5, r5, 27          # shift to the right by 27 bits so that 4-bit sensor value is in lower 4 bits 
 	andi   r5, r5, 0x0f

 	movia  r9, 0xffffdf
 	stwio  r9, 0(r7)

 	movi   r10, 7
 	bgt	   r5, r10, timing		#if greater than 9, hand detected, going to release, otherwise hold

hold:  
	movia	 r9, 0xfffffffc       # motor0 enabled (bit0=0), direction set to forward (bit1=0) 
	stwio	 r9, 0(r8)	

	br sensor3_ready

# timer table:
# 1s 0x5F5E100
# 2s 0xBEBC200
# 3s 0x11E1A300

timing: 	
	movi r10, 0x5F5E100
	stwio r10, 8(r6)				#set to 1sec cound down
	movi r10, 4
	stwio r10, 4(r6)				 # Start the timer without continuing or interrupts 

	stwio r0,16(r7)              # Tell Timer to take a snapshot of the timer 
	ldwio r3,16(r7)              # Read snapshot bits 0..15 
	ldwio r4,20(r7)              # Read snapshot bits 16...31 
	slli  r4,r4,16		# Shift left logically
	or    r4,r4,r3               # Combine bits 0..15 and 16...31 into one register 
	
	#using this to implement RNG

	bgt r4, r10, release


release:
	movia	 r9, 0xfffffffe       # motor0 enabled (bit0=0), direction set to forward (bit1=0) 
	stwio	 r9, 0(r8)	

	br sensor3_ready


# HEX Display

hex_permutation:
	beq r19, r0, display0
	movi r10, 1
	beq r19, r10, display1
	movi r10, 2
	beq r19, r10, display2
	movi r10, 3
	beq r19, r10, display3
	movi r10, 4
	beq r19, r10, display4
	movi r10, 5
	beq r19, r10, display5
	movi r10, 6
	beq r19, r10, display6

display0:
	movia r9, 0xffffbf
	stwio r9, 0(r7)
display1:
	movia r9, 0xffff82
	stwio r9, 0(r7)
display2:
	movia r9, 0xffffdb
	stwio r9, 0(r7)
display3:
	movia r9, 0xffffcf
	stwio r9, 0(r7)
display4:
	movia r9, 0xffffe6
	stwio r9, 0(r7)
display5:
	movia r9, 0xffffed
	stwio r9, 0(r7)
display6:
	movia r9, 0xfffffd
	stwio r9, 0(r7)	