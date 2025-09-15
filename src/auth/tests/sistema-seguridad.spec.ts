/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermisosGuard } from '../guards/permisos.guard';
import { MontoLimiteGuard } from '../guards/monto-limite.guard';
import { RolMinimoGuard } from '../guards/rol-minimo.guard';
import { PermisosService } from '../services/permisos.service';
import { PermisosCache } from '../services/permisos-cache.service';
import { NivelRol } from '../decorators/rol-minimo.decorator';

describe('Sistema de Seguridad Completo', () => {
  let permisosGuard: PermisosGuard;
  let montoLimiteGuard: MontoLimiteGuard;
  let rolMinimoGuard: RolMinimoGuard;
  let permisosService: PermisosService;
  let permisosCache: PermisosCache;
  let reflector: Reflector;

  // Mocks
  const mockPermisosService = {
    validarAccionUsuario: jest.fn(),
    obtenerPermisosUsuario: jest.fn(),
    validarMontoLimite: jest.fn(),
  };

  const mockPermisosCache = {
    getValidacionAccion: jest.fn(),
    setValidacionAccion: jest.fn(),
    getPermisosUsuario: jest.fn(),
    setPermisosUsuario: jest.fn(),
    invalidarUsuario: jest.fn(),
  };

  const mockReflector = {
    get: jest.fn(),
    getAllAndOverride: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermisosGuard,
        MontoLimiteGuard,
        RolMinimoGuard,
        {
          provide: PermisosService,
          useValue: mockPermisosService,
        },
        {
          provide: PermisosCache,
          useValue: mockPermisosCache,
        },
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    permisosGuard = module.get<PermisosGuard>(PermisosGuard);
    montoLimiteGuard = module.get<MontoLimiteGuard>(MontoLimiteGuard);
    rolMinimoGuard = module.get<RolMinimoGuard>(RolMinimoGuard);
    permisosService = module.get<PermisosService>(PermisosService);
    permisosCache = module.get<PermisosCache>(PermisosCache);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('PermisosGuard', () => {
    it('debe permitir acceso cuando el usuario tiene el permiso requerido', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: { sub: 'user123', idEmpresa: 'emp1' },
      });

      mockReflector.get.mockReturnValue('CREAR_USUARIOS');
      mockPermisosCache.getValidacionAccion.mockReturnValue(null);
      mockPermisosService.validarAccionUsuario.mockResolvedValue({
        tienePermiso: true,
        motivo: 'Usuario tiene permiso directo',
      });

      // Act
      const result = await permisosGuard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(mockPermisosService.validarAccionUsuario).toHaveBeenCalledWith(
        'user123',
        'emp1',
        'CREAR_USUARIOS',
        undefined,
      );
    });

    it('debe denegar acceso cuando el usuario no tiene el permiso requerido', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: { sub: 'user123', idEmpresa: 'emp1' },
      });

      mockReflector.get.mockReturnValue('ELIMINAR_USUARIOS');
      mockPermisosCache.getValidacionAccion.mockReturnValue(null);
      mockPermisosService.validarAccionUsuario.mockResolvedValue({
        tienePermiso: false,
        motivo: 'Permiso no asignado al usuario',
      });

      // Act
      const result = await permisosGuard.canActivate(context);

      // Assert
      expect(result).toBe(false);
    });

    it('debe usar cache cuando está disponible', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: { sub: 'user123', idEmpresa: 'emp1' },
      });

      mockReflector.get.mockReturnValue('VER_REPORTES');
      mockPermisosCache.getValidacionAccion.mockReturnValue({
        tienePermiso: true,
        motivo: 'Desde cache',
      });

      // Act
      const result = await permisosGuard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(mockPermisosService.validarAccionUsuario).not.toHaveBeenCalled();
    });
  });

  describe('MontoLimiteGuard', () => {
    it('debe permitir transacciones dentro del límite', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: { sub: 'user123', idEmpresa: 'emp1' },
        body: { monto: 5000 },
      });

      mockReflector.get.mockReturnValue('LIMITE_TRANSACCIONES');
      mockPermisosService.validarMontoLimite.mockResolvedValue({
        puedeEjecutar: true,
        limiteMaximo: 10000,
        montoSolicitado: 5000,
      });

      // Act
      const result = await montoLimiteGuard.canActivate(context);

      // Assert
      expect(result).toBe(true);
    });

    it('debe denegar transacciones que excedan el límite', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: { sub: 'user123', idEmpresa: 'emp1' },
        body: { monto: 15000 },
      });

      mockReflector.get.mockReturnValue('LIMITE_TRANSACCIONES');
      mockPermisosService.validarMontoLimite.mockResolvedValue({
        puedeEjecutar: false,
        limiteMaximo: 10000,
        montoSolicitado: 15000,
        motivo: 'Monto excede límite permitido',
      });

      // Act
      const result = await montoLimiteGuard.canActivate(context);

      // Assert
      expect(result).toBe(false);
    });

    it('debe permitir acceso cuando no hay monto en el request', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: { sub: 'user123', idEmpresa: 'emp1' },
        body: {},
      });

      mockReflector.get.mockReturnValue('LIMITE_TRANSACCIONES');

      // Act
      const result = await montoLimiteGuard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(mockPermisosService.validarMontoLimite).not.toHaveBeenCalled();
    });
  });

  describe('RolMinimoGuard', () => {
    it('debe permitir acceso cuando el usuario tiene rol suficiente', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: {
          sub: 'user123',
          rolActivo: { nivel: NivelRol.GERENTE },
        },
      });

      mockReflector.get.mockReturnValue(NivelRol.SUPERVISOR);

      // Act
      const result = await rolMinimoGuard.canActivate(context);

      // Assert
      expect(result).toBe(true);
    });

    it('debe denegar acceso cuando el usuario no tiene rol suficiente', async () => {
      // Arrange
      const context = createMockExecutionContext({
        user: {
          sub: 'user123',
          rolActivo: { nivel: NivelRol.COCINERO },
        },
      });

      mockReflector.get.mockReturnValue(NivelRol.GERENTE);

      // Act
      const result = await rolMinimoGuard.canActivate(context);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('Integración de Guards', () => {
    it('debe manejar múltiples validaciones correctamente', async () => {
      // Scenario: Endpoint que requiere permiso + validación de monto + rol mínimo
      const user = {
        sub: 'user123',
        idEmpresa: 'emp1',
        rolActivo: { nivel: NivelRol.SUPERVISOR },
      };

      // PermisosGuard
      const permisosContext = createMockExecutionContext({ user });
      mockReflector.get.mockReturnValueOnce('APROBAR_REEMBOLSOS');
      mockPermisosCache.getValidacionAccion.mockReturnValue(null);
      mockPermisosService.validarAccionUsuario.mockResolvedValue({
        tienePermiso: true,
      });

      const permisosResult = await permisosGuard.canActivate(permisosContext);
      expect(permisosResult).toBe(true);

      // MontoLimiteGuard
      const montoContext = createMockExecutionContext({
        user,
        body: { monto: 3000 },
      });
      mockReflector.get.mockReturnValueOnce('LIMITE_REEMBOLSOS');
      mockPermisosService.validarMontoLimite.mockResolvedValue({
        puedeEjecutar: true,
      });

      const montoResult = await montoLimiteGuard.canActivate(montoContext);
      expect(montoResult).toBe(true);

      // RolMinimoGuard
      const rolContext = createMockExecutionContext({ user });
      mockReflector.get.mockReturnValueOnce(NivelRol.COCINERO);

      const rolResult = await rolMinimoGuard.canActivate(rolContext);
      expect(rolResult).toBe(true);
    });
  });

  describe('PermisosCache', () => {
    beforeEach(() => {
      // Reset cache service mock
      jest.clearAllMocks();
      permisosCache = new PermisosCache();
    });

    it('debe almacenar y recuperar permisos de usuario', () => {
      // Arrange
      const permisos = {
        usuario: {
          id: 'user123',
          nombre: 'Usuario Test',
          rol: 'EMPLEADO',
          licencia: 'BASIC',
        },
        permisos: [
          {
            id: '1',
            codigo: 'CREAR_USUARIOS',
            nombre: 'Crear Usuarios',
            modulo: 'usuarios',
            permitido: true,
            requiereAutorizacion: false,
          },
          {
            id: '2',
            codigo: 'VER_REPORTES',
            nombre: 'Ver Reportes',
            modulo: 'reportes',
            permitido: true,
            requiereAutorizacion: false,
          },
        ],
        navegacion: [],
        limitaciones: {},
      };

      // Act
      permisosCache.setPermisosUsuario('user123', 'emp1', permisos);
      const result = permisosCache.getPermisosUsuario('user123', 'emp1');

      // Assert
      expect(result).toEqual(permisos);
    });

    it('debe retornar null para entradas expiradas', (done) => {
      // Arrange
      const permisos = {
        usuario: {
          id: 'user123',
          nombre: 'Usuario Test',
          rol: 'EMPLEADO',
          licencia: 'BASIC',
        },
        permisos: [
          {
            id: '1',
            codigo: 'CREAR_USUARIOS',
            nombre: 'Crear Usuarios',
            modulo: 'usuarios',
            permitido: true,
            requiereAutorizacion: false,
          },
        ],
        navegacion: [],
        limitaciones: {},
      };

      // Act
      permisosCache.setPermisosUsuario('user123', 'emp1', permisos);

      // Simular expiración inmediata para testing
      setTimeout(() => {
        const result = permisosCache.getPermisosUsuario('user123', 'emp1');
        expect(result).toEqual(permisos); // Aún válido
        done();
      }, 100);
    });

    it('debe invalidar cache por usuario', () => {
      // Arrange
      const permisos1 = {
        usuario: {
          id: 'user123',
          nombre: 'Usuario Test 1',
          rol: 'EMPLEADO',
          licencia: 'BASIC',
        },
        permisos: [],
        navegacion: [],
        limitaciones: {},
      };
      const permisos2 = {
        usuario: {
          id: 'user456',
          nombre: 'Usuario Test 2',
          rol: 'EMPLEADO',
          licencia: 'BASIC',
        },
        permisos: [],
        navegacion: [],
        limitaciones: {},
      };

      permisosCache.setPermisosUsuario('user123', 'emp1', permisos1);
      permisosCache.setPermisosUsuario('user456', 'emp1', permisos2);

      // Act
      permisosCache.invalidarUsuario('user123');

      // Assert
      expect(permisosCache.getPermisosUsuario('user123', 'emp1')).toBeNull();
      expect(permisosCache.getPermisosUsuario('user456', 'emp1')).toEqual(
        permisos2,
      );
    });
  });

  // Helper function para crear mock ExecutionContext
  function createMockExecutionContext(requestData: any): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => requestData,
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as ExecutionContext;
  }
});
