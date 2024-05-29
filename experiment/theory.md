### Theory

The circuit configuration of single-phase bridge inverter is shown in Fig. 1.

<center>
  <img src="images/th1.png" height="350px">
  
Fig. 1. Circuit diagram of single -phase bridge inverter.

</center>
<br>
Based on the operation of switches (S1, S2, S3, S4: ON/OFF-state) the operating principle of the inverter is explained below briefly. All possible switching states are given Table.1.
<br><br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
    <td>
      
**Switch (S1, S2): ON-state** 

**Switch (S3, S4): OFF-state**
    </td>
    <td>

**Switch (S1, S2): OFF-state**

**Switch (S3, S4): ON-state**  
    </td>
  </tr>
  <tr>
<td style="width:50%">
<center>
  
**Mode – I :  Switch S:ON-state, Diode: OFF-state**
<br>
<img src="images/th2.png">
<br><br>
Fig. 2(a). Equivalent circuit when S1 and S2 are ON
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>
  
**Mode – II :  Switch S:OFF-state, Diode: ON-state**
<br>
<img src="images/th3.png">
<br><br>
Fig. 2(b). when S3 and S4 are ON
<br><br>
</center> 
    </td>
  </tr>
</table>
<br>


<div style="float: left; width:100%;"><br>
Table-1. Switch states for full bridge Inverter-Unipolar switching
<br>
</div>

<center>
<table align="center" width="100%" >
  <tr style="text-align: center; font-weight: bold; background-color: #c9c9c9;">
    <td style="text-align: center; font-weight: bold;">Switching States</td>
    <td style="text-align: center; font-weight: bold;">S1</td>
    <td style="text-align: center; font-weight: bold;">S2</td>
    <td style="text-align: center; font-weight: bold;">S3</td>
    <td style="text-align: center; font-weight: bold;">S4</td>
    <td style="text-align: center; font-weight: bold;">V<sub>0</sub></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td style="text-align: center; font-weight: bold;">1</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">V<sub>in</sub></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td style="text-align: center; font-weight: bold;">2</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">-V<sub>in</sub></td>
  </tr>
  <tr style="background-color: #FFF;">
    <td style="text-align: center; font-weight: bold;">3</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">0</td>
  </tr>
  <tr style="background-color: #FFF;">
    <td style="text-align: center; font-weight: bold;">4</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">OFF</td>
    <td style="text-align: center; font-weight: bold;">ON</td>
    <td style="text-align: center; font-weight: bold;">0</td>
  </tr>
</table>
</center>
<br>


<div style="float: left; width:100%;"><br>

**MULTIPLE-PULSE WIDTH MODULATION (SPWM)**     

</div>

<center>
  <img src="images/th4.png">
  
Fig. 3. Multi-pulse PWM generation.

</center>
<br>


- The harmonic content can easily be reduced by using several pulses in each half-cycle of output voltage. 
- The generation of gating signals for turning ON and OFF of switches is done by comparing a square wave reference signal with triangular carrier wave.
- The frequency of reference signals sets the output frequency (fo) and the carrier frequency (fc) determines the number of pulses (p) per half-cycle. 
- The modulation index (M) controls the output voltage magnitude.
- This type of modulation is also known as uniform pulse-width modulation (UPWM).
- The number of pulses (p) per half-cycle is:

