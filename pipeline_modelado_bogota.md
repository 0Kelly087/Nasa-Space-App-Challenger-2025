<task>
Construir un pipeline reproducible de ciencia de datos ambiental en formato Jupyter Notebook (Python) que descargue, procese y modele concentraciones horarias de PM2.5 y NO₂ en Bogotá D.C., usando datos de fuentes oficiales y respetando condiciones de frontera espacial.

<context>
- Proyecto: NASA Space Apps 2025 — Modelado de calidad del aire.
- Ciudad: Bogotá D.C., Colombia.
- Variables objetivo: PM2.5 (µg/m³), NO₂ (ppb).
- Fuentes de datos (en orden de prioridad):
  1. RMCAB / Secretaría Distrital de Ambiente (https://www.ambientebogota.gov.co/red-de-monitoreo-de-calidad-del-aire-de-bogota-rmcab)
  2. Datos Abiertos Bogotá (https://datosabiertos.bogota.gov.co)
  3. IDECA (https://www.ideca.gov.co) — polígono de Bogotá.
  4. NASA Earth Observatory (https://airquality.gsfc.nasa.gov) — capas satelitales NO₂ y AOD.
- Frecuencia objetivo: Horaria (si sólo hay diaria → reescalar/interpolar y documentar).
- Filtro espacial: Solo estaciones dentro del polígono oficial de Bogotá.
- Salidas esperadas:
  - CSV con predicciones e intervalos de confianza.
  - Modelos guardados (.joblib o .pt).
  - Métricas (RMSE, MAE, CRPS).
</context>

<role>
Actuar como un experto en ciencia de datos ambiental y modelado espacio-temporal.  
Responsable de construir un pipeline reproducible (ETL + modelado + validación) con código limpio, documentación clara y estructura de notebook estándar.
</role>

<workflow>
1. <section title="Resumen inicial">
   Explicar objetivo del notebook, fuentes de datos y lógica de modelado.
2. <section title="Importar librerías">
   Incluir pandas, geopandas, numpy, matplotlib, seaborn, xgboost, prophet (opcional), sklearn, joblib, torch (si se usa LSTM), etc.
3. <section title="Descarga y carga de datos">
   - Implementar funciones para descargar datos de:
     - RMCAB (históricos y estaciones)
     - Datos Abiertos Bogotá (API)
     - IDECA (polígono de Bogotá)
     - NASA (NO₂ y AOD, como features espaciales)
   - Documentar URLs y credenciales necesarias.
4. <section title="Exploración de datos (EDA)">
   - Visualizar cobertura temporal, valores faltantes, correlaciones, outliers.
   - Mapas de estaciones con geopandas.
5. <section title="ETL y construcción de features">
   - Limpieza: valores negativos, duplicados, nulos.
   - Outliers: detección con IQR o z-score.
   - Imputación: interpolación temporal + KNN espacial.
   - Reescalado horario.
   - Creación de lags (1h, 3h, 6h, 24h) y medias móviles.
   - Filtro espacial por polígono IDECA.
6. <section title="Modelado">
   - Modelos base:
     - Persistencia (naïve)
     - SARIMAX o Prophet (series temporales)
     - XGBoost (tabular con lags)
     - LSTM (opcional, recurrente)
   - Entrenamiento, validación cruzada temporal y espacial.
   - Guardar artefactos (joblib o torch.save).
7. <section title="Evaluación">
   - Métricas: RMSE, MAE, CRPS (si se usa distribución probabilística).
   - Validación: temporal split (train/test por fechas) y spatial holdout (excluir estaciones).
   - Gráficos: pred vs. real, residuos, importancia de variables.
8. <section title="Exportación de resultados">
   - CSV con predicciones + intervalos.
   - Guardar métricas en JSON o CSV.
9. <section title="Próximos pasos operativos">
   - Conexión API REST para predicciones en tiempo real.
   - Dashboard (Plotly/Dash o Streamlit) para visualización de calidad del aire.
   - Integrar umbrales de alerta basados en OMS y normativa colombiana (res. 2254 de 2017).
</workflow>

<implementation>
El notebook debe incluir celdas con código ejecutable, comentarios claros en español y referencias a las fuentes de datos utilizadas.  
Se recomienda dividir en secciones numeradas y mantener modularidad (funciones y clases).
</implementation>

<output>
- `predicciones_bogota_pm25_no2.csv`
- `modelos/pm25_xgb.joblib`
- `modelos/no2_xgb.joblib`
- `metricas_validacion.csv`
- Visualizaciones de EDA y performance.
</output>

<reproducibility>
- Compatible con Python 3.10+.
- Dependencias listadas en `requirements.txt`.
- Uso de rutas relativas (`data/raw`, `data/processed`, `models/`).
- Control de versiones recomendado con Git + DVC.
</reproducibility>
