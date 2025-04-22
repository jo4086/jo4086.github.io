```shell
$bin1 = "00000001"  # 1
$bin2 = "00000001"  # 1
$int1 = [Convert]::ToInt32($bin1, 2)
$int2 = [Convert]::ToInt32($bin2, 2)
$sum = $int1 + $int2  # = 2
$binResult = [Convert]::ToString($sum, 2).PadLeft(8, '0')  # 00000010
Set-Content -Path "./result.bin" -Value $binResult

# result: 00000010
```

```shell
$bin1 = "0x06"
$bin2 = "0x06"
$int1 = [Convert]::ToInt32($bin1, 16)
$int2 = [Convert]::ToInt32($bin2, 16)
$sum = $int1 + $int2
$binResult = [Convert]::ToString($sum, 16).PadLeft(8, '0')
Set-Content -Path "./result.bin" -Value $binResult
[byte[]] $bytes = [byte][Convert]::ToInt32($binResult, 16)
[System.IO.File]::WriteAllBytes("./convert.bin", $bytes)
# result: 0000000C
```

```shell
$bin1 = "0x06"
$bin2 = "0x06"
$int1 = [Convert]::ToInt32($bin1, 16)
$int2 = [Convert]::ToInt32($bin2, 16)
$sum = $int1 + $int2
$binResult = '0x' + [Convert]::ToString($sum, 16).ToUpper().PadLeft(2, '0')
Set-Content -Path "./result.bin" -Value $binResult
[byte[]] $bytes = [byte][Convert]::ToInt32($binResult, 16)
[System.IO.File]::WriteAllBytes("./convert.bin", $bytes)
# result: 0x0C
```
