/**
 * 叮咚鱼塘
 */

 let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, this)
 let FloatyInstance = singletonRequire('FloatyUtil')
 let widgetUtils = singletonRequire('WidgetUtils')
 let automator = singletonRequire('Automator')
 let commonFunctions = singletonRequire('CommonFunction')
 
 let BaseSignRunner = require('./BaseSignRunner.js')
 
 function SignRunner () {
   let signImg = 'iVBORw0KGgoAAAANSUhEUgAAAH8AAABGCAYAAADlyEt2AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAA10SURBVHic7Z37T1PnH8ffvdKeQqvlUi4TGZRbRSNQxHERKJipASGSabbMLNuyZNn+nW3ZsoQZcS4aR3S6iKAbmxuC1MkQqNyvFroCTSltLYX2+0PTI4ee0lKhPfg9r4Rwes7znPN5zvuc5zzP57lx3G63Gyz/l3AjbQBL5ODv1okXFhYwPT2Nubk5GI1GmEwmWK1W2O12rK2tkeE4HI7PNt0+f2G2ir857nbjb9dGf3YHisPn8xEVFQWJRIKYmBjI5XLExcVBoVBg3759PmnYKTg7me3rdDr09/djeHgYJpPJc4EQbwhdHLow2xEx1HjBPGC79cBIpVKkpqYiIyMDBw8e9EnP6/Da4huNRnR3d+PJkydYXl72nDRAgjZus+IHf38kEglycnKgUql2JEcIWfy5uTl0dHSgp6fn1cmCTFCgsKz4gc+bm5uLo0ePIjY21ieNwbJt8V++fIm7d+/izz//DMpgVvzdEd/7/8iRIyguLoZQKPRJayC2Jf6TJ09w69YtLC8vv1aCAoVlxQ9efA6HA4lEgnfeeQdZWVk+6d2KoMW/du0aHj16FJTxrPjhFd+LSqVCZWUlgiVgVc9oNOLKlSuYnJykvZkszEGn02FpaQnV1dWQyWQBw2/55o+Pj+OHH37YshTPvvnMefO92xKJBCdPnkRSUhK2wq+Hb2hoCN988w0pPMvewWaz4c6dO5idnd0yHK344+Pj+P777+F0OnfFOJbdZ319Ha2trZibm/Mbxkf8//77D01NTVhdXd1V41h2n7W1Ndy/fx9ms5n2uI/4zc3NbFb/BmG1WvH777/THqOI/9NPP2FycjIcNrGEEYPBQDrlNkKK39PTg87OzrAaxRI+dDodRkZGKPu4gMdle/PmzYgYxRI+uru7KWU5LgDcuXPHb6GA5c3BZrNBq9WSv7l6vR4dHR2Rs4glrPT392NpaQkAwH/w4EGEzfFFo9FAJBLBZDLh8ePHcLlcAeMUFhYiISEBZrMZvb29sNvtYbA0eJRKJTgcDqxW65Z173DQ19eHyspK8Lu7uyNqyGZSU1Oh0WjA5XIxPj6Orq6ugHFEIhE0Gg2io6NhMBgoDVBMoa6ujkxTpMtXw8PDyM/P370+fKFy8uRJcLlcuN1u/Pbbb0HFqaioQHR0NADQVmkCUV5ejgMHDgTVcEUXZmlpCUzMQbfi+fPnzBK/uLgYSqUSgOcmnzlzxieM9+ZbLBY0NzcjKSkJpaWl5PGysjKUlZX5vYbT6cSlS5co+5KSkpCenh6y3WKxOOS4kWJ0dJQ54sfGxqKmpoayLzk52W94giDA4/Fw9uxZyv5ALVl07RWLi4vQ6/Xkbw6HA5lMBoIgyH1032nvg7i4uAgAKCkpIR/Eb7/9FisrK1vaEklsNhszxOfz+bhw4QKZdet0OkxPT9OG9d5wh8OB2tpapKSkAABmZ2eh0+koYejira+v+xzzZtkbm0k//fRTEAQBt9uNGzduYHR01CcM3f+9BCPEP3fuHFJTUwEAWq0WLS0tUCqVqK+vR1tbG/r7+8mw3pssl8tRVVUFwNP8fPXqVQCeHOHChQvQ6/Vob2/3uVYwIpWWlkKhUAAABgYGSOEBT2+Z1dVVjI2NhZha5hBx8c+ePYuCggIAgF6vx61btwAAlZWViI2NRWNjI1wuFwYHB8k4+/fvR1FREXp6epCVlUUpPZeVlSEtLQ1paWkQiUS4ffv2tuxJSEjA8ePHAQArKyuUgty7776LgoICmM1mvHjxAi9fvgw53UwgosO1CIKASqUCAJhMJly9epUczXP9+nUYjUYIhUI0NjaS3//9+/fj4sWLKC8vR1VVFQYHB2G1WslzbswpCgoKcO7cuW3ZdObMGURFRcHtduPBgweUc4+MjMDlckEmk6G6uvq10s4EIiq+zWbDpUuXMDs7i+bmZrLgBADLy8u4cuUKTCYTent7odfrkZKSgo8//hgJCQlkuKKiIrz11luU8964cYPMKaRSadCl8aqqKrIM8ezZMwwMDFCOj4+Po6+vDwBw6NAhZGdnbz/RDCLi2f78/Dy++uorAL7fY6PRiK+//hp2ux1qtRqnTp2CWCyG2+3G4OAgMjIysG/fPnz00Udoa2uj+K2vX7+OsrIydHV10RbyNpOeno5jx44B8IwzbGtrow33xx9/IDMzExKJBDU1NZiZmWGcNzFYIi5+IAQCARoaGpCXlwfAU1VrbW3F48eP8fbbb+O9995DTEwM6urqkJGRgbt378JisQAA/v7776CuoVKpUFdXBz7/1e344IMPwOfzIRAIKP83homOjoZGo8Gvv/66gykOH4wVn8/no7y8HKWlpWR922w24+bNmxgZGQGHw8HExAQuX76MxsZGJCYmQqVSIS0tDY8ePUJnZ2dQbQKAp7eLQCAgf8fFxQVtp0qlwsjIiE9b+V6AceILBAKUlJTg2LFjkMvl5P7BwUH88ssvPo4Tg8GA7777DjU1NSguLgZBEKiuroZarcbTp0+h1WophTY6pqamoNfrIRQKsby8DIfDAafTidXVVTidTsr26uoqVldXwePxUF9fDx6Ph+PHj7Pivw7eKlZeXh6kUim5f2FhAffv38ezZ88A0NfT19fX0dbWhuHhYZw6dQpJSUmQyWSorKxESUkJJiYmoNPpMDAw4Pf739TUROuwyc3NhVgshs1mw9DQECVMZ2cnkpOT95xf30tExRcIBCgvL0dOTg4OHDgALvdV5cPlcsFisWBychJKpZL0+Xvx56zR6/UQCAQgCAIEQUAoFCI7OxvZ2dk4ffo0Zmdnce3ataAKgYDHbxAfH4/5+XkMDQ1RjnV2drIevlBxOp0oLCykfGONRiO0Wi0cDgcaGhqgVqtDOvfPP/8MAMjPz0daWhq4XC6ioqIAeLo070WxdpqIZ/t//fUX6urqMDExAa1Wi3///RccDgdKpRLDw8N+4wUSz2KxYGpqCv39/YiPj8fRo0ehVCqD6h/w/0LExe/q6sLIyAgWFxcpgo6OjmJ0dNRHZJlMhsOHD2NlZQV9fX1+x6wJhULExcVhYWEBRqMR7e3taG9vp31oMjMzcfr0aVr7vOWPxMREfPnll7Txf/zxR7J6uZeIuPjAqyZRqVSKoqIiHDp0CLdv36YdQ/D5559DKpVifn6e9LbRceLECZSUlGB2dhYPHz6kNM5sRiAQUAqZ/vAXZmNZZS/BCPG9pKSkkG36lZWVPp0uAE8LXlFRERITE6FUKmlb16RSKQoLC8HlcpGUlBSwZ/Li4iLpHdz8ZhcWFpLb//zzD218h8Ox5fmZCqPE1+l0mJqawsGDB5GZmYmMjAyMj49TwnR1dZHCqtVqWvErKipIf75Wq4XRaNzyugaDAa2trbSfkNTUVLK0f+/evTeqPZ9x+dXGuX4qKip8jhsMBvJz4PWxb0ShUODIkSMAPB7BcHZLX1pawtjYGMbGxihzDTIVxok/ODiImZkZAJ7uzhkZGT5hvE22QqHQpyqo0WhIV21HR0dYRxs/f/4cLS0taGlp2RNt/YwTHwAePnxIbp84ccLn+NOnT2G327GyskKZhSorKws5OTkAPM2vvb29u24rn88Pak48Jn4WGPXN99Lf34+ZmRmIRCIyF9iI0+lEU1MT5ufnKTdVo9GQx+/duxfy9Xk8HuRyOWQyGeLj4wF4qnr19fUQi8UQi8UQiUQQi8WIioqC0WikLZx6kclkpJ1Mmuc64uILBAIcPnwYAPXt0Gq1pAs2Pz+fEscbbmNP3ZycHPL3ixcvkJiYiMTERJ/zjo2NURp6+Hw+zp8/TxFUJBLR2urtdbSZrVoPeTwe2U8AYE7NgCCIyItPEATOnz+/o+f09uGjo6mpiSL+2toaUlJSSNdvIBwOB+x2O2w2G/m3sTbx4YcfQi6Xw+Vywe12QygUUvoABKp5hAulUhl58YHIZ4UrKyvg8XgUUa1WK/lnsVhgNpuxuLhIvrn+qnoWi8Xv2AGTyeTTNSxS5OTkgHP58mW3d7xeuKYXCzX+Vja+zlRsYrEYdrt9R6ZiU6vV5GfM5XLB5XLBbrfDYDCgt7cXNpstqLS+zlRsgeJkZWV5BmpWV1eDaYM1w81O9sHTarXQarVBP4yRwOsH4SYnJ29ryk6WvU1eXh7ZQ4oLALW1tUFN18mytyEIguIU4wKe8e0NDQ0RM4olPGyemp308BUVFaGkpCQiRrHsPrm5ucjMzKTso7h333//fb/1Y5a9i0KhoHWT+/j2L168GFTHBpa9gUQiIUczb8ZH/ISEBHzyySchLdvBwiz4fD5qamr8FuZpW/XS09Px2WefUUaxsOwteDweOYbBH36bdLOzs/HFF1+wn4A9CEEQqK2t9Rm9vJmAa+z4W2blTXLvBoq3HffuTqU1VPeuQqHYmWVWNsIusBT89XciraGIv90Fltil1d4A8Xd9aTUv7KKKzBI/bIsqboRdTjWy4kdkOdXNsAsph098xiykTAe7hHpwcYJJq3eb0Uuo+2NhYQHT09OYm5uD0WiEyWSC1WqF3W73GdAQjCDbCbsd8YOJt1NC+rsWn89HVFQUJBIJYmJiIJfLERcXB4VCsSNvuD92TXwW5sPIQRss4eF/hxRBnlt4D0gAAAAASUVORK5CYII='
   BaseSignRunner.call(this)
   let _package_name = 'com.sina.weibo'
   
   this.exec = function () {
     launch(_package_name)
     sleep(1000)
     this.awaitAndSkip(['\\s*允许\\s*', '\\s*取消\\s*'])
     FloatyInstance.setFloatyText('准备查找 我的')
     let mine = widgetUtils.widgetGetOne(/^我$/)
     if (mine) {
       FloatyInstance.setFloatyInfo({
         x: mine.bounds().centerX(),
         y: mine.bounds().centerY()
       }, '找到了 我 按钮')
       sleep(600)
       automator.click(mine.bounds().centerX(), mine.bounds().centerY())
       sleep(1000)
       if (this.captureAndCheckByImg(signImg, '签到', null, true)) {
         this.setExecuted()
       } else {
        FloatyInstance.setFloatyText('未找到 签到按钮')
       }
     } else {
       FloatyInstance.setFloatyText('未找到 我')
       if (this.restartLimit-- >= 0) {
         FloatyInstance.setFloatyText('未找到 我 准备重开应用')
         commonFunctions.killCurrentApp()
         sleep(2000)
         this.exec()
       }
     }
     sleep(3000)
     !config._debugging && commonFunctions.minimize(_package_name)
   }
 }
 
 SignRunner.prototype = Object.create(BaseSignRunner.prototype)
 SignRunner.prototype.constructor = SignRunner
 module.exports = new SignRunner()