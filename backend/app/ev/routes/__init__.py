from . import vehicles
from . import stations
from . import chargers
from . import charging_sessions

from .vehicles import router as vehicles_router
from .stations import router as stations_router
from .chargers import router as chargers_router
from .charging_sessions import router as sessions_router
from .dashboard import router as dashboard_router